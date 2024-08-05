using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Approval
    {
        public int ApprovalId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ApprovalName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int ApprovalDays { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string IsActive { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public  string Description { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string  ColorNo{ get; set; }
    }
}




