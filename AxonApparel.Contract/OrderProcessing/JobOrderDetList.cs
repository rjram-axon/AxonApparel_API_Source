using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobOrderDetList
    {
        public int Buy_Ord_MasId { get; set; }
        public int JobOrderId { get; set; }
        public string JobOrderNo { get; set; }
        public DateTime JobOrdDate { get; set; }
        public int companyid { get; set; }
        public string CompanyName { get; set; }
        public string OrderNo { get; set; }
        public int BuyerId { get; set; }
        public string Buyer { get; set; }
        public int Quantity { get; set; }
        public DateTime OrderDate { get; set; }
        public string RefNo { get; set; }
        public int StyleId { get; set; }
        public string StyleName { get; set; }
        public int StyleRowId { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string ProdUnit { get; set; }
        public string Merchandiser { get; set; }
        public int MerchandiserId { get; set; }
        public string UnitOrOther { get; set; }
        public string Amend { get; set; }
        public string DespatchedClosed { get; set; }
        public string JobOrWork { get; set; }
        public string IsApproved { get; set; }
        public int ToApproved { get; set; }

        public DateTime Issuedate { get; set; }
        public string Job_Order_RefNo { get; set; }
        public decimal Rate { get; set; }
        public string RateType { get; set; }
        public int ProductionQty { get; set; }
        public string Manager { get; set; }
        public int ManagerId { get; set; }
        public string Merchendiser { get; set; }
        public int MerchendiserId { get; set; }
        public string QC { get; set; }
        public int QCId { get; set; }
        public string Stage { get; set; }
        public int StageId { get; set; }
        public string UnitorOther { get; set; }
        public string CompanyUnit { get; set; }
        public int CompanyUnitId { get; set; }
        public string ToApprove { get; set; }
        public int ToApproveId { get; set; }
        public int ExcessPer { get; set; }
        public string Currency { get; set; }
        public int CurrencyId { get; set; }
        public int Exchange { get; set; }
        public int DecimalPlace { get; set; }
        public string Consumption { get; set; }
        public String RateDesc { get; set; }
        public string Remarks { get; set; }
        public string JobOrdType { get; set; }
        public string CompanyUnitAddress { get; set; }
    }
}
