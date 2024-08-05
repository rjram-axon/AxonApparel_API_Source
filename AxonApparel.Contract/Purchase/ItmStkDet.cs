using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ItmStkDet
    {
        public int StockId { get; set; }
        public int UnitId { get; set; }
        public string unit { get; set; }
        public int Itemid { get; set; }
        public string item { get; set; }
        public int Colorid { get; set; }
        public string color { get; set; }
        public int sizeid { get; set; }
        public string size { get; set; }
        public decimal qty { get; set; }
        public decimal Rate { get; set; }
        public int buymsaid { get; set; }
        public string joborderNo { get; set; }
        public string TransType { get; set; }
        public string Transno { get; set; }
        public decimal alloted { get; set; }
        public string ItemCat { get; set; }
        public int processId { get; set; }
        public decimal sQty { get; set; }
        public string lotNo { get; set; }
        public decimal balQty { get; set; }
        public string purorprod { get; set; }
        public DateTime transdate { get; set; }
        public int companyid { get; set; }
        public string company { get; set; }
        public int supplierid { get; set; }
        public string supplier { get; set; }
        public decimal return_qty { get; set; }
        public int uomid { get; set; }
        public string uom { get; set; }
        public int MfrId { get; set; }
        public int Styleid { get; set; }
        public string style { get; set; }
        public string unit_or_other { get; set; }
        public string ReProg { get; set; }
        public string StockType { get; set; }
        public string Remarks { get; set; }
        public decimal Markup_Rate { get; set; }
        public string CatType { get; set; }
        public int GuomId { get; set; }
        public string ItemCode { get; set; }
        public string BundleNo { get; set; }
        public string OrderIdent { get; set; }
        public string FabricGSM { get; set; }
       // public int StoreUnitID { get; set; }
        public int SectionID { get; set; }
        public DateTime StockDate { get; set; }
        public int ShipRowId { get; set; }
        public string BARCODE { get; set; }
        public long slno { get; set; }
        public string Type { get; set; }
        public int itemgrpid { get; set; }
        public string itmgrp { get; set; }
        public string refno { get; set; }
        public int opstkid { get; set; }
        public string orderno { get; set; }
        //public long sno { get; set; }
        public string workord { get; set; }
        public int Mode { get; set; }
        public int snumb { get; set; }
        public decimal IssueQty { get; set; }
        public decimal OldQty { get; set; }
        public string skuno { get; set; }

        public int ParentUnitid { get; set; }
        public string Storetype { get; set; }
        public int StoreUnitID { get; set; }
        public string StoreName { get; set; }

        public string ProcessName { get; set; }
        public string ManuFacturer { get; set; }

        public string Status { get; set; }
        public string Result { get; set; }
        public string entrydate { get; set; }
        public int Createdby { get; set; }
        public List<ItmStkDet> ReStkDet { get; set; }
        public int ChkPlanned { get; set; }
       
    }
}
