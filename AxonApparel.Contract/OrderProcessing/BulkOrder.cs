using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace AxonApparel.Domain
{
    public class BulkOrder
    {
        public int Buy_Ord_MasId { get; set; }
        public string Order_No { get; set; }
        public string FOrderNo { get; set; }
        public DateTime Order_Date { get; set; }
        public int BuyerId { get; set; }
        public int QuoteId { get; set; }
        public string RevQuoteNo { get; set; }
        public int RevQuoteId { get; set; }
        public int Buyer_AddId { get; set; }
        public int ManagerId { get; set; }
        public int MerchandiserId { get; set; }
        public string Ref_No { get; set; }
        public DateTime Ref_Date { get; set; }
        public int Pay_SystemId { get; set; }
        public int SystemId { get; set; }
        public int Payment_ModeId { get; set; }
        public int AgentId { get; set; }
        public int Agent_AddId { get; set; }
        public int ShipAgentId { get; set; }
        public int ShipAgent_AddId { get; set; }
        public int CurrencyId { get; set; }
        public int Exchange { get; set; }
        public string Cancel { get; set; }
        public string Comit { get; set; }
        public int CompanyId { get; set; }
        public string Closed { get; set; }
        public DateTime CloseDate { get; set; }
        public int Quantity { get; set; }
        public string Cost_def { get; set; }
        public int GuomId { get; set; }
        public int Guom_Conv { get; set; }
        public int Agency_Per { get; set; }
        public int Bas_Unit { get; set; }
        public string Remarks { get; set; }
        public string ClaimType { get; set; }
        public string NominatedForwarder { get; set; }
        public string CSP { get; set; }
        public string Buyer_Ref_No { get; set; }
        public string TransAmend { get; set; }
        public int ConsigneeId { get; set; }
        public int CreatedBy { get; set; }
        public string OrdType { get; set; }
        public int Consignee_AddId { get; set; }
        public int StyleCount { get; set; }
        public int GCount { get; set; }
        public int OICount { get; set; }
        public string Company { get; set; }
        public int ParentOrdId { get; set; }
        public int EnquiryId { get; set; }
        public string Buyer { get; set; }
        public string PA { get; set; }
        public string Rev { get; set; }
        public int OrdApp { get; set; }
        public string OrdPost { get; set; }
        public string PlanPost { get; set; }
        //public List<NominatedSupplier> NominatedSupplier { get; set; }


        //nominated supplier
        public int SupplierId { get; set; }
        public int ItemId { get; set; }
        public string Supplier { get; set; }
        public string Item { get; set; }
        public string NSOrderNo { get; set; }
        public int NomSupId { get; set; }
        //Order Closing
        //Amend
        public int AmendId { get; set; }
        public decimal AmdQty { get; set; }
        public int StyId { get; set; }
        public int CheckBom { get; set; }
        public int CheckJob { get; set; }
        //

        public List<BulkOrder> NSupplier { get; set; }

        public List<BulkOrderCancel> BulkOrdCancel { get; set; }

        public List<SampleTypeEntry> SampleTypeList { get; set; }

    }
}
