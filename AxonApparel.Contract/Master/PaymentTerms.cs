using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class PaymentTerms
    {
        /// <summary>
        /// 
        /// </summary>
        public int PaymentTermsId { get; set; }
        public int CountPaymentTermsId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string PaymentTermsName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string IsActive { get; set; }
    }
}
