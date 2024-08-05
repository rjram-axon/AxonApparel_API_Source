using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
   public class ProcessReceiptMas
    {
        public int proc_recpt_masid { get; set; }
        public string proc_recpt_no { get; set; }
        public DateTime proc_recpt_date { get; set; }
        public string Recpt_Ref_no { get; set; }
        public DateTime Recpt_Ref_date { get; set; }
        public string remarks { get; set; }
        public string OrderType { get; set; }
        public int StoreUnitID { get; set; }
        public string storeunit { get; set; }
        public int CreatedBy { get; set; }
        public string InwardNo { get; set; }
        public string SupplierInvoiceNo { get; set; }
        public bool ExcldetoInv { get; set; }
        public string InspNo { get; set; }
        public DateTime InspDate { get; set; }
        public string EWayNo { get; set; }
        public DateTime EWayDate { get; set; }

        public int processid { get; set; }
        public string process { get; set; }
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public int wrkdivid { get; set; }
        public string wrkdiv { get; set; }
        public int processordid { get; set; }
        public string processorder { get; set; }
        public DateTime proddate { get; set; }
        public int processorid { get; set; }
        public string processor { get; set; }
        public decimal ordqty { get; set; }
        public decimal recvdqty { get; set; }
        public decimal bal { get; set; }
        public int buymasid { get; set; }
        public string orderno { get; set; }
        public string refno { get; set; }
        public int colorid { get; set; }
        public string color { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public string processortype { get; set; }
        public string type { get; set; }
        public int buyerid { get; set; }
        public string buyer { get; set; }
        public int unitid { get; set; }
        public string unit { get; set; }
        public string jobordno { get; set; }
        public string CancelNo { get; set; }
        public DateTime Canceldate { get; set; }
        public string CancelRefNo { get; set; }
        public DateTime CancelRefDate { get; set; }
        public int CancelMasId { get; set; }
        public int styleid { get; set; }
        public string style { get; set; }
        public string ProcQltyno { get; set; }
        public string FinProcess { get; set; }
        public string CheckLoad { get; set; }
        public decimal chkIns { get; set; }
        public int ChkAccPos { get; set; }
        public decimal chkdebqty { get; set; }
        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public string StoreName { get; set; }


        public List<ProcessReceiptDet> ProcDet { get; set; }
        public List<ProcessReceiptJobdet> ProcJobDet { get; set; }

        public List<ProcessReturnItemDet> ProcRetItmDet { get; set; }
        public List<ProcessReceiptLot> ProcRetLotDet { get; set; }
    }
}
