namespace NgTemplate.Contexts
{
    using System;
    using System.Security.Principal;

    public class WindowsUserContext : IUserContext
    {
        public string Name
        {
            get
            {
                var current = WindowsIdentity.GetCurrent();

                return current != null ? current.Name : null;
            }
            set
            {
                throw new NotSupportedException("You cannot set the context name when using WindowsUserContext");
            }
        }
    }
}