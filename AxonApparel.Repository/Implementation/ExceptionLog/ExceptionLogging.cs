using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class ExceptionLogging
    {                                            
        MasterEntities entities = new MasterEntities();
        private static String exepurl;

        public bool SendExcepToDB(Exception exdb,string FormandMethodName)
        {
            //string url = HttpContext.Current.Request.Url.AbsoluteUri;

            var flg = entities.Proc_Apparel_ExceptionLogging(exdb.InnerException.InnerException.Message.ToString(), exdb.GetType().Name.ToString(), exdb.StackTrace.ToString(), FormandMethodName);                                                                        
            entities.SaveChanges();
            return true;
        }  
    }
}
