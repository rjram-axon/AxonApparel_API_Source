using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Currency
    {
        public int CurrencyId { get; set; }
        public int CountCurrencyId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CurrencyName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CountryID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsActive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Abbreviation { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Euro { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal Exchangerate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int Decimalplace { get; set; }


    }
}
