﻿namespace NgTemplate
{
    using System;
    using System.Collections.Generic;
    using System.Web.Http.Dependencies;

    using Microsoft.Practices.Unity;

    public class CustomUnityDependencyResolver : IDependencyResolver
    {
        private readonly IUnityContainer _container;

        private readonly SharedDependencyScope _sharedScope;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomUnityDependencyResolver"/> class for a container.
        /// </summary>
        /// <param name="container">The <see cref="IUnityContainer"/> to wrap with the <see cref="IDependencyResolver"/>
        /// interface implementation.</param>
        public CustomUnityDependencyResolver(IUnityContainer container)
        {
            if (container == null) throw new ArgumentNullException("container");

            _container = container;
            _sharedScope = new SharedDependencyScope(container);
        }

        /// <summary>
        /// Reuses the same scope to resolve all the instances.
        /// </summary>
        /// <returns>The shared dependency scope.</returns>
        public IDependencyScope BeginScope()
        {
            return _sharedScope;
        }

        /// <summary>
        /// Disposes the wrapped <see cref="IUnityContainer"/>.
        /// </summary>
        public void Dispose()
        {
            _container.Dispose();
            _sharedScope.Dispose();
        }

        /// <summary>
        /// Resolves an instance of the default requested type from the container.
        /// </summary>
        /// <param name="serviceType">The <see cref="Type"/> of the object to get from the container.</param>
        /// <returns>The requested object.</returns>
        public object GetService(Type serviceType)
        {
            try
            {
                return _container.Resolve(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        /// <summary>
        /// Resolves multiply registered services.
        /// </summary>
        /// <param name="serviceType">The type of the requested services.</param>
        /// <returns>The requested services.</returns>
        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return _container.ResolveAll(serviceType);
            }
            catch (ResolutionFailedException)
            {
                return null;
            }
        }

        private sealed class SharedDependencyScope : IDependencyScope
        {
            private readonly IUnityContainer _container;

            public SharedDependencyScope(IUnityContainer container)
            {
                _container = container;
            }

            public object GetService(Type serviceType)
            {
                return _container.Resolve(serviceType);
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                return _container.ResolveAll(serviceType);
            }

            public void Dispose()
            {
                // NO-OP, as the container is shared.
            }
        }
    }
}