namespace NgTemplate.Contexts
{
    using System;

    public interface IDateContext
    {
        DateTime Now { get; }

        DateTime Today { get; }
    }
}