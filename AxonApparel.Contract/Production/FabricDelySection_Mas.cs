using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class FabricDelySection_Mas
    {
        //Mas 
        public int FabDelyIssueId { get; set; }
        public string FabDelyIssueNo { get; set; }
        public DateTime FabDelyIssueDate { get; set; }
        public string Joborderno { get; set; }
        public int EmployeeId { get; set; }
        public string Remarks { get; set; }
        public int CompanyUnitId { get; set; }
        public int CompanyId { get; set; }
        public string InorOut { get; set; }
        public string OrderType { get; set; }
        public int WorkDivisionId { get; set; }
        public int ProdPrgId { get; set; }
        public int FromStoreid { get; set; }
        public int CreatedBy { get; set; }
        public int FLineId { get; set; }
        public bool IsApproved { get; set; }
        public int ApprovedBy { get; set; }
        public DateTime ApprovedDate { get; set; }
        public string VehicleNo { get; set; }

        public int ToStoreid { get; set; }

        //Det

        public int FabDelyIssueDetId { get; set; }
        //public int FabDelyIssueId { get; set; }
        public int ItemId { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        //public string InorOut { get; set; }
        public string Inp_op { get; set; }  //Inp_op
        //public decimal Consumption { get; set; }
        public decimal Grammage { get; set; }
        public decimal weight { get; set; }
        public decimal ordqty { get; set; }
        public decimal rate { get; set; }
        public decimal issqty { get; set; }
        public decimal secqty { get; set; }
        public decimal receivedqty { get; set; }
        public decimal ReturnQty { get; set; }
        public decimal LossQty { get; set; }
        public decimal MarkupRate { get; set; }
        public decimal Markupvalue { get; set; }
        public decimal CancelQty { get; set; }
        public int ProcessId { get; set; }

        public decimal AllotedQty { get; set; }

        public int FabDelyIssueStockId { get; set; }
        public int StockId { get; set; }
        public decimal IssueQty { get; set; }
        public decimal Markup_rate { get; set; }

        public decimal qty { get; set; }
        public decimal Oldissqty { get; set; }

        public string OrderCumIssue { get; set; }

        public string Mode { get; set; }
        public string MainType { get; set; }

        public List<FabricDelySection_Mas> FabricDelySectionDet { get; set; }
        public List<FabricDelySection_Mas> FabricDelySectionStock { get; set; }
    }
}
