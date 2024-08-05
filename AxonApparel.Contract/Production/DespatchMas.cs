using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class DespatchMas
    {
        public int DespatchId { get; set; }
        public int CompanyId { get; set; }
        public int StyleId { get; set; }
        public int ShipMode { get; set; }
        public int SystemId { get; set; }
        public int MerchenId { get; set; }
        public int ManagerId { get; set; }
        public int BuyerId { get; set; }
        public string RefNo { get; set; }
        public string ShipType { get; set; }
        public int IssStoreId { get; set; }
        public string OrderType { get; set; }
        public string PreCarrBy { get; set; }
        public string PlaceofRecpt { get; set; }
        public string VesselFlightNo { get; set; }
        public string MarksNo { get; set; }
        public int Cartons { get; set; }
        public int CreatedBy { get; set; }
        public decimal CBMQty { get; set; }
        public int SupplierId { get; set; }
        public int PortofDischargeId { get; set; }
        public string DespatchNo { get; set; }
        public DateTime DespatchDate { get; set; }
        public DateTime ShipDate { get; set; }
        public DateTime InvRefDate { get; set; }
        public string OrderNo { get; set; }
        public string BuyOrdShip { get; set; }
        public DateTime DocRefDate { get; set; }
        public string InvRefNo { get; set; }
        public string DocRefNo { get; set; }
        public Nullable<int> SalesInvid { get; set; }

        public List<DespatchDet> DespatchDet { get; set; }
        public List<DespatchStock> DespatchStock { get; set; }
    }
}
