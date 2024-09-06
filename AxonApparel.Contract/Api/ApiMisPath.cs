using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Contract.Api
{
    public class MisPath
    {
        public bool ValidateProcessOrderApproval { get; set; }
        public string ValidatePOApproval { get; set; }
        public string ValidatePOGerApproval { get; set; }
        public bool chkValidateQuoteDetailsForPO { get; set; }
        public bool chkValidateQuoteDetailsForProcessOrder { get; set; }
    }
}
