using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class ProductionWorkOrder
    {
        public string OrderNo { get; set; }
        public string RefNo { get; set; }
        public string Style { get; set; }
        public decimal Quantity { get; set; }
        public DateTime Shipmentdate { get; set; }
        public DateTime Orderdate { get; set; }
        public int CompanyId { get; set; }
        public int Stylerowid { get; set; }
        public int StyleRow { get; set; }
        public string Buyer { get; set; }
        public string Guom { get; set; }
        public int Conv { get; set; }
        public int Convquantity { get; set; }
        public int BuyerId { get; set; }
        public int StyleId { get; set; }
        public int ProductionQty { get; set; }
        public int AllowancePer { get; set; }
        public int EmployeeID { get; set; }
        public int ProcessUnitId { get; set; }
        public int ProdUnitId { get; set; }
        public string Remarks { get; set; }
        public string WorkOrder { get; set; }
        public int JobNoId { get; set; }
        public int BMasId { get; set; }
        public int ComboId { get; set; }
        public int PlanBom { get; set; }
        public int PlanProg { get; set; }

        public List<ProductionShipWOEntry> lstprodShipwo { get; set; }
        public List<ProductionItemWOEntry> lstprodItemwo { get; set; }
    }
}
