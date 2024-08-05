using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;

namespace AxonApparel.Repository
{
    public class PlanningMainRepository : IPlanningMainRepository
    {
        PlanningEntities entities = new PlanningEntities();

        public IQueryable<PlanningMain> GetDataMainList(int? companyId, string orderNo, string refno, int? styleId, string fromDate, string toDate, string OType, string OrderType, string bud, string buystat, int empid, int buyerid, string Job_Ord_No, string DispatchClosed)
        {

            IQueryable<PlanningMain> query = (from cd in entities.Proc_Apparel_GetPlanningOrderDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(orderNo) ? "" : orderNo, string.IsNullOrEmpty(refno) ? "" : refno, styleId == null ? 0 : styleId, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OType, OrderType, bud, buystat, empid, buyerid == null ? 0 : buyerid, string.IsNullOrEmpty(Job_Ord_No) ? "" : Job_Ord_No, DispatchClosed)
                                              select new PlanningMain
                                                  {

                                                      CompanyID =(int)cd.companyid,
                                                      Company = cd.Company,
                                                      CLookup = cd.CLookup,
                                                      buyer = cd.Buyer,
                                                      buyerid = (int)cd.BuyerId,
                                                      City = cd.City,
                                                      Order_No = cd.order_no,
                                                      Order_date = (DateTime)cd.Order_date,
                                                      Ref_no = cd.Ref_no,
                                                      StyleRowid = cd.StyleRowid,
                                                      StyleID = cd.Styleid,
                                                      Style = cd.Style,
                                                      Quantity = (int)cd.Quantity,
                                                      ProductionQty = (int)cd.ProductionQty,
                                                      OrderQty = (int)cd.OrderQty,
                                                      Despatch_Closed = cd.Despatch_Closed,
                                                      CostDefId = cd.CostDefId,
                                                      ProSeq = cd.PSqmas,
                                                      TProgQty = cd.TPrgQty,
                                                      ProdAmend = cd.ProdDetAmend,
                                                      CostApp = cd.CostApproved,
                                                      PlanApp = cd.PlanApproved,
                                                      Job_Ord_No = cd.WorkOrder
                                                  }).AsQueryable();
            return query;
        }




        public IQueryable<PlanningMain> GetDataOrderRepDetails(string fromDate, string toDate, string OrderType)
        {
            IQueryable<PlanningMain> query = (from cd in entities.Proc_Apparel_GetPlanningMainOrderDropDetails(fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OrderType)
                                              select new PlanningMain
                                              {

                                                  Order_No = cd.Order_No,
                                                  Ref_no = cd.Ref_No,

                                              }).AsQueryable();
            return query;
        }


        public IQueryable<PlanningMain> GetDataStyleRepDetails(string fromDate, string toDate, string OrderType)
        {
            IQueryable<PlanningMain> query = (from cd in entities.Proc_Apparel_GetPlanningMainStyleDropDownDetails(fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), OrderType)
                                              select new PlanningMain
                                              {

                                                  StyleID = cd.StyleId,
                                                  Style = cd.Style,
                                                  Job_Ord_No = cd.Workorder,

                                              }).AsQueryable();
            return query;
        }


    }
}
