using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DespatchInnerDetail
    {

        /// <summary>
        /// Inner Header Properties
        /// </summary>        

        public long Sno { get; set; }
        public int DespatchDetId { get; set; }
        public int ShipRowID { get; set; }
        public int CompanyID { get; set; }
        public string Company { get; set; }
        public string BuyOrdShip { get; set; }
        public int BuyerID { get; set; }
        public string Buyer { get; set; }
        public int StyleID { get; set; }
        public string Style { get; set; }
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string ShipNo { get; set; }
        public DateTime ShipDate { get; set; }
        public string DespatchNo { get; set; }
        public DateTime DespatchDate { get; set; }
        public string DocRefNo { get; set; }
        public int MerchendiserId { get; set; }
        public string Merchendiser { get; set; }
        public int DestinationID { get; set; }
        public string Destination { get; set; }
        public int ManagerID { get; set; }
        public string Manager { get; set; }
        public DateTime RefDate { get; set; }
        public string ShipMode { get; set; }
        public int SystemId { get; set; }
        public string System { get; set; }
        public string InvRefNo { get; set; }
        public DateTime InvRefDate { get; set; }
        public int ExcessPer { get; set; }
        public int MOSid { get; set; }

        /// <summary>
        /// Inner Item Detail
        /// </summary>
        public int ItemId { get; set; }
        public string Item { get; set; }
        public int SizeId { get; set; }
        public string Size { get; set; }
        public int ColorId { get; set; }
        public string Color { get; set; }
        public string IsDecimal { get; set; }
        public decimal Quantity { get; set; }
        public decimal Productionqty { get; set; }
        public decimal BalQty { get; set; }
        public decimal Rate { get; set; }
        public decimal DespatchQty { get; set; }

        /// <summary>
        /// Inner Item Stock
        /// </summary>
        public string TransNo { get; set; }
        public int ProcessId { get; set; }
        public string Process { get; set; }        
        public int SupplierId { get; set; }
        public string Supplier { get; set; }
        public DateTime TransDate { get; set; }        
        public string BundleNo { get; set; }
        public string LotNo { get; set; }
        public int StockId { get; set; }        
    }
}
