using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Common
{
    public static class Helper
    {
        /// <summary>
        /// This method extension will return TRUE / FALSE string based on 1/0 from value
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ToBoolChar(this bool value)
        {
            return value ? "TRUE" : "FALSE";
        }
    }
}
