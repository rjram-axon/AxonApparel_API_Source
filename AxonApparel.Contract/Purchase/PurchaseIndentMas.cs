using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PurchaseIndentMas
    {
        public string IndentNo { get; set; }
        public string Purchase_Type { get; set; }
        public string Purchase_itemType { get; set; }
        public string Remarks { get; set; }
        public string LocalImport { get; set; }
        public string Closed { get; set; }
        public string Cancel { get; set; }
        public string Approved { get; set; }
        public string IndentHead { get; set; }
        public string CapitalOrRevenue { get; set; }
        public string IndentType { get; set; }
        public int IndentMasid { get; set; }
        public int Companyid { get; set; }
        public int Company_unitid { get; set; }
        public int EmployeeId { get; set; }
        public string Employee { get; set; }
        public int Departmentid { get; set; }
        public string Department { get; set; }
        public int SectionID { get; set; }
        public int CurrencyId { get; set; }
        public DateTime IndentDate { get; set; }
        public DateTime OrderDate { get; set; }
        public int BMasId { get; set; }
        public string OrdNo { get; set; }
        public string RefNo { get; set; }
        public string JobNo { get; set; }
        public string Style { get; set; }
        public int JobId { get; set; }
        public int BuyerId { get; set; }
        public int StyleRowId { get; set; }
        public string Buyer { get; set; }
        public string Company { get; set; }
        public string CompUnit { get; set; }
        public DateTime FrmDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Status { get; set; }
        public string StatusId { get; set; }
        public string Section { get; set; }
        public List<PurchaseIndentOrder> PurIndOrder { get; set; }
        public List<PurchaseIndentDet> PurIndDet { get; set; }
        
    }
}

