using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class JobReceiptMain
    {
        public int Sno { get; set; }
        public int JobReceiptId { get; set; }
        public string JobRecptno { get; set; }
        public string Jobno { get; set; }
        public string Style { get; set; }
        public string DcNo { get; set; }        
        public string Remarks { get; set; }
        public DateTime DcDate { get; set; }
        public DateTime JobRecptDate { get; set; }
        public DateTime InvRefDate { get; set; }
        public DateTime DocRefDate { get; set; }
        public string Orderno { get; set; }
        public string InvRefNo { get; set; }
        public string Refno { get; set; }        
        public string Supplier { get; set; }
        public decimal JobQty { get; set; }
        public decimal RecptQty { get; set; }
        public string Quality { get; set; }
        public int CompanyId { get; set; }
        public int SupplierId { get; set; }
        public int StyleId { get; set; }
        public string Company { get; set; }
        public int ItemId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public string Item { get; set; }
        public string BuyOrdShip { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public decimal Rate { get; set; }
        public string DespatchNo { get; set; }
        public string ShipNo { get; set; }
        public string ShipMode { get; set; }
        public int ShipModeId { get; set; }
        public int SystemId { get; set; }
        public string System { get; set; }
        public string DocRefNo { get; set; }
        public string Destination { get; set; }
        public string Lotno { get; set; }
        public int Despatch { get; set; }        
        public decimal RejQty { get; set; }
        public string ShipType { get; set; }
        public int CreatedBy { get; set; }
        public int JobRecptDetid { get; set; }
        //Second Grid Properties
        public string UnitorOther { get; set; }
        public decimal Quantity { get; set; }
        public decimal BalQty { get; set; }
          public string StoreName { get; set; }
         public string Storetype { get; set; }
        public int ParentUnitid { get; set; }
        public int StoreUnitID { get; set; }

        public List<JobReceiptDet> JobRecptDet { get; set; }
    }
}
