namespace NgTemplate.Contexts
{
    using System;

    public class DateContext : IDateContext
    {
        public DateTime Now
        {
            get
            {
                return DateTime.Now;
            }
        }

        public DateTime Today
        {
            get
            {
                return DateTime.Today;
            }
        }
    }
}