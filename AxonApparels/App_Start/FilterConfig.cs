using System.Web;
using System.Web.Mvc;

namespace AxonApparels
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            //filters.Add(new HandleErrorAttribute
            //{
            //    View = "Error"
            //}, 1);
        }
    }
}