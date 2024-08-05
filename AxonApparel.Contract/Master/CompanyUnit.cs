using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace AxonApparel.Domain
{
    public class CompanyUnit
    {
        public int Id { get; set; }
        public string CompanyUnitName { get; set; }
        public string CompanyUnitLookup { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public int CityId { get; set; }
        public int CompanyId { get; set; }
        public string ZipCode { get; set; }
        public string IssueType { get; set; }
        public string IsActive { get; set; }
        public int CountCompUnitId { get; set; }
        public decimal WastageCut { get; set; }
        public decimal WastagePro { get; set; }
        public decimal OfficeExp { get; set; }
        public decimal OrderOverHead { get; set; }
        public decimal QuoteOverHead { get; set; }
    }
}
