using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Domain
{
    public class PlanningSampleMain
    {
        public int PlanID { get; set; }
        public int CompanyID { get; set; }
        public int CompanyUnitID { get; set; }
        public string CompanyUnit { get; set; }
        public int BMasID { get; set; }
        public int StyleID { get; set; }

        public int ItemID { get; set; }
        public int CreatedBy { get; set; }
        public int LockCon { get; set; }
        public int LockFab { get; set; }
        public int LockYarn { get; set; }
        public int LockAccs { get; set; }
        public int LockPack { get; set; }
        public string Order_No { get; set; }
        public string Job_Ord_No { get; set; }
        public string Con_Plan { get; set; }
        public string Fabric_Plan { get; set; }
        public string Yarn_Plan { get; set; }
        public string Acc_Plan { get; set; }
        public string Pack_Plan { get; set; }
        public string Fab_plan_Remarks { get; set; }
        public string IsApproved { get; set; }
        public bool LockPlanning { get; set; }
        public DateTime EDate { get; set; }
        public int GUomID { get; set; }
        public string GUom { get; set; }
        public string Type { get; set; }
        public int CostDefId { get; set; }

        public string OrderType { get; set; }

        //main list 
        //  public int companyid { get; set; }
        public string Company { get; set; }
        public string CLookup { get; set; }
        public int buyerid { get; set; }
        public string buyer { get; set; }
        public string buyer_lookup { get; set; }
        public string City { get; set; }
        //  public string order_no { get; set; }
        public DateTime Order_date { get; set; }
        public string Ref_no { get; set; }
        public string Style { get; set; }
        public string Despatch_Closed { get; set; }
        public int StyleRowid { get; set; }
        // public int Styleid { get; set; }
        public int Quantity { get; set; }
        public int ProductionQty { get; set; }
        public int OrderQty { get; set; }
        public int TID { get; set; }
        public int merchandiserid { get; set; }

        
        //Fabric PlanSample
        public List<PlanningSampleFabricDet> SamFabricItemDet { get; set; }

        public List<PlanningSampleFabricDet> SamYarnItemDet { get; set; }
    }
}
