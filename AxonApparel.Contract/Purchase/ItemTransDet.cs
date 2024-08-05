using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ItemTransDet
    {
        public int TransDetId { get; set; }
        public int TransMasId { get; set; }
        public int StockId { get; set; }
        public int NewStockId { get; set; }
        public int FromItemId { get; set; }
        public int ToItemId { get; set; }
        public int ColorId { get; set; }
        public int ToColorId { get; set; }
        public int SizeId { get; set; }
        public int ToSizeId { get; set; }
        public decimal TransQty { get; set; }
        public decimal SecTransQty { get; set; }
      
        public string EntryNo { get; set; }
        public System.DateTime EntryDate { get; set; }
       
      
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }

        ////Stockdetails load

        public decimal Qty { get; set; }
        public decimal Alloted { get; set; }
        public decimal BalQty { get; set; }
        public decimal sQty { get; set; }


        public string ItemCat { get; set; }
        public string OrderType { get; set; }
        public string Order_no { get; set; }
        public string Job_Ord_No { get; set; }
        public string StockType { get; set; }
        public string Unit_Or_Other { get; set; }
        public int Supplierid { get; set; }
        public string Supplier_Type { get; set; }
        public string Supplier { get; set; }
        public string Company { get; set; }
        public string ItemType { get; set; }
        public string Itemgroup { get; set; }
        public string Item { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public string Uom { get; set; }
        public decimal Rate { get; set; }

        public string sUom { get; set; }
        public int Companyid { get; set; }
        public string TransType { get; set; }
        public string Transno { get; set; }
        public string TransDate { get; set; }
        public string Lotno { get; set; }
        public int ItemGroupid { get; set; }
        //public int Itemid { get; set; }
        //public int Colorid { get; set; }
        //public int Sizeid { get; set; }
        public int Uomid { get; set; }
        public int sUomId { get; set; }
        public string IsDecimal { get; set; }
        public string Mfr { get; set; }
        public string Process { get; set; }
        public int Processid { get; set; }
        public int Mfrid { get; set; }
        public int StoreUnitId { get; set; }
        public string StoreName { get; set; }
        public string ItemDesc { get; set; }
        public string User { get; set; }
        public string Refno { get; set; }
        public string Style { get; set; }
    }
}
