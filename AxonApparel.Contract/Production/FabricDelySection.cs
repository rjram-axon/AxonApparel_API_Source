using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FabricDelySection
    {
        ////Mas 
        //public int FabDelyIssueId { get; set; }
        //public string FabDelyIssueNo { get; set; }
        //public DateTime FabDelyIssueDate { get; set; }
        //public string Joborderno { get; set; }
        //public int EmployeeId { get; set; }
        //public string Remarks { get; set; }
        //public int CompanyUnitId { get; set; }
        //public int CompanyId { get; set; }
        //public string InorOut { get; set; }
        //public string OrderType { get; set; }
        //public int WorkDivisionId { get; set; }
        //public int ProdPrgId { get; set; }
        //public int FromStoreid { get; set; }
        //public int CreatedBy { get; set; }
        //public int FLineId { get; set; }
        //public int IsApproved { get; set; }
        //public int ApprovedBy { get; set; }
        //public DateTime ApprovedDate { get; set; }
        //public string VehicleNo { get; set; }

        ////Det

        //public int FabDelyIssueDetId { get; set; }
        ////public int FabDelyIssueId { get; set; }
        //public int ItemId { get; set; }
        //public int ColorId { get; set; }
        //public int SizeId { get; set; }
        ////public string InorOut { get; set; }
        //public string Inp_op { get; set; }
        ////public decimal Consumption { get; set; }
        //public decimal Grammage { get; set; }
        //public decimal weight { get; set; }
        //public decimal ordqty { get; set; }
        //public decimal rate { get; set; }
        //public decimal issqty { get; set; }
        //public decimal secqty { get; set; }
        //public decimal receivedqty { get; set; }
        //public decimal ReturnQty { get; set; }        
        //public decimal LossQty { get; set; }
        //public decimal MarkupRate { get; set; }
        //public decimal Markupvalue { get; set; }
        //public decimal CancelQty { get; set; }
        //public int ProcessId { get; set; }

        //Procedure

        public int CuttingOrdDetId { get; set; }  // $('#tblinputgrd').DataTable({

        public int BuyOrdMasId { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public decimal Qty { get; set; }
        public string WorkOrder { get; set; }
        public string ProdPrgNo { get; set; }
        //public int ProdPrgId { get; set; }

        //Main grid
        public int FabDelyIssueId { get; set; }
        public string FabDelyIssueNo { get; set; }
        public DateTime FabDelyIssueDate { get; set; }

        public string StrFabDelyIssueDate { get; set; }

        public int WorkDivisionId { get; set; }
        public string WorkDivision { get; set; }
        public string Incharger { get; set; }
        public int InchargerId { get; set; }
        public string CompanyUnit { get; set; }
        public int CompanyUnitId { get; set; }
        public string Buyer { get; set; }
        public int BuyerId { get; set; }
        public int CompanyId { get; set; }
        public string company { get; set; }
        public int EmployeeId { get; set; }
        public string Supplier { get; set; }
        public int SupplierId { get; set; }
        public string OrderType { get; set; }
        public int jmasid { get; set; }

        //Det grid
        public string InterExter { get; set; }
       // public string Style { get; set; }
        public int StyleId { get; set; }
        public string Remarks { get; set; }
        public int FabDelyIssueDetId { get; set; }

        //Input Output Grid Properties

        public int Sno { get; set; }

        public string Item { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string BaseUnit { get; set; }
        public string SecUnit { get; set; }
        public string InorOut { get; set; }
        public int StockId { get; set; }
        public int ItemId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public int BUomId { get; set; }
        public int SUomId { get; set; }
        public int ProdPrgId { get; set; }
        public decimal ProdprgQty { get; set; }
        public decimal BalQty { get; set; }
        public decimal StockQty { get; set; }
        public decimal Grammage { get; set; }
        public int ProcessId { get; set; }
        public decimal issqty { get; set; }
        public decimal secqty { get; set; }
        public decimal ordqty { get; set; }
        public decimal rate { get; set; }
        public decimal apprate { get; set; }
        public decimal weight { get; set; }
        public decimal AllowBalQty { get; set; }
        public string Type { get; set; }
        public decimal receivedqty { get; set; }
        public decimal ReturnQty { get; set; }

        public int ChkRecpt { get; set; }
        //public string ProdPrgNo { get; set; }

        public string StoreType { get; set; }
        public string StoreName { get; set; }
        public int StoreUnitID { get; set; }
        public int ParentUnitid { get; set; }
        public decimal Oldissqty { get; set; }
        public string Process { get; set; }
        //public List<CuttingOrderDetail> cuttingorddet { get; set; }
        //public List<Domain.CuttingOrderStockProperties> cuttingordstckdet { get; set; }


        ////Second screen Properties
        //public int BuyOrdMasId { get; set; }
        //public string OrderNo { get; set; }
        //public string OrderCumIssue { get; set; }
        //public string RefNo { get; set; }
        //public string WorkOrder { get; set; }
        //public string ProdPrgNo { get; set; }
        //public int ProdPrgId { get; set; }
        //public int FromStoreId { get; set; }
        //public string Style { get; set; }
        //public int StyleId { get; set; }
        ////public string Remarks { get; set; }
        //public string OrderType { get; set; }
        //public decimal Qty { get; set; }
        ////public int IsApproved { get; set; }
        //public string InterExter { get; set; }

        ////Main Screen Properties
        //public int FabDelyid { get; set; }
        //public int WorkDivisionId { get; set; }
        //public decimal LossPer { get; set; }
        ////public int CreatedBy { get; set; }
        //public string FabDelyNo { get; set; }
        //public string Saccode { get; set; }
        //public string Convtype { get; set; }
        //public DateTime FabDelydate { get; set; }
        //public DateTime DeliverDate { get; set; }
        //public string WorkDivision { get; set; }
        //public string Incharger { get; set; }
        //public int InchargerId { get; set; }
        //public int jmasid { get; set; }
        //public string Supplier { get; set; }
        //public int SupplierId { get; set; }
        ////Cutting Header Det Properties
        //public string CompanyUnit { get; set; }
        //public int CompanyUnitId { get; set; }
        //public int CuttingOrdDetId { get; set; }
        //public string Buyer { get; set; }
        //public int BuyerId { get; set; }
        //public int CompanyId { get; set; }
        //public string company { get; set; }
        ////public int EmployeeId { get; set; }

        ////Input Output Grid Properties
        //public string Item { get; set; }
        //public string Size { get; set; }
        //public string Color { get; set; }
        //public string BaseUnit { get; set; }
        //public string SecUnit { get; set; }
        //public string InorOut { get; set; }
        //public int StockId { get; set; }
        //public int ItemId { get; set; }
        //public int SizeId { get; set; }
        //public int ColorId { get; set; }
        //public int BUomId { get; set; }
        //public int SUomId { get; set; }
        //public decimal ProdprgQty { get; set; }
        //public decimal BalQty { get; set; }
        //public decimal StockQty { get; set; }
        //public decimal Grammage { get; set; }
        //public int ProcessId { get; set; }
        //public decimal issqty { get; set; }
        //public decimal secqty { get; set; }
        //public decimal ordqty { get; set; }
        //public decimal rate { get; set; }
        //public decimal apprate { get; set; }
        //public decimal weight { get; set; }
        //public decimal AllowBalQty { get; set; }
        //public string Type { get; set; }

        //public string Process { get; set; }

        ////public List<CuttingOrderDetail> cuttingorddet { get; set; }
        ////public List<Domain.CuttingOrderStockProperties> cuttingordstckdet { get; set; }
    }
}
