using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProcessSequenceMain
    {
        public int Buy_Ord_MasId { get; set; }
        public string Order_No { get; set; }
        public DateTime Order_Date { get; set; }
        public string JobNo { get; set; }
        public int JobNoId { get; set; }
        public int BuyerId { get; set; }
        public string BuyerName { get; set; }
        public int Styleid { get; set; }
        public string Style { get; set; }
        public int Stylerowid { get; set; }
        public int Buyer_AddId { get; set; }
        public int ManagerId { get; set; }
        public int Companyunitid { get; set; }
        public string Companyunitname { get; set; }
        public int MerchandiserId { get; set; }
        public string MerchandiserName { get; set; }
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
        public string CompanyName { get; set; }
        public string Closed { get; set; }
        public DateTime CloseDate { get; set; }
        public DateTime EntryDate { get; set; }
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
        public int Processseqmasid { get; set; }
        public DateTime FDate { get; set; }
        public DateTime TDate { get; set; }
        public int[] sbTwo { get; set; }

        public string Despatch_Closed { get; set; }

        public decimal CPrgNo { get; set; }

        public int Processid { get; set; }
        public string Processname { get; set; }
        public int ProcessSeqid { get; set; }
        public int ChkProcPrgid { get; set; }

        public List<ProcessList> ProcessListDetails { get; set; }

    }
}
