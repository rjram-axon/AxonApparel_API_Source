using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class Terms
    {
        public int TermsId { get; set; }
        public string TermsName { get; set; }       
        public string IsActive { get; set; }
        public string TermsTempName { get; set; }
        public int TermsTempNameId { get; set; }
        public List<TermDet> TermDet { get; set; }
    }
}
