using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AxonApparel.Repository
{
    public class PlanningApprovalRepository : IPlanningApprovalRepository
    {

        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();


        public IQueryable<PlanningApproval> LoadMaingrid(int? cmpid, int? styleid, string ordno, string refno, string type, string ordtype, string fromdate, string todate)
        {
            var query = (from YD in entities.proc_PlanningApproval(cmpid, styleid, ordno, refno, type, ordtype, fromdate, todate)
                         select new PlanningApproval
                         {
                             cmpid = (int)YD.companyid,
                             cmp = YD.Company,
                             buyerid = (int)YD.buyerid,
                             buyer = YD.buyer,
                             orderno = YD.order_no,
                             date = (DateTime)YD.Order_date,
                             refno = YD.Ref_no,
                             qty = (decimal)YD.Quantity,
                             stylerwid = YD.StyleRowid,
                             styleid = YD.Styleid,
                             style = YD.Style,
                             type = YD.type,
                             item = YD.item,
                             itemid = (int)YD.ItemID,


                         }).AsQueryable();

            return query;
        }


        public IQueryable<PlanningBomApproval> LoadBomdet(string ordno, int styleid, int Itemid)
        {


            var query = (from YD in entities.proc_GetTrimsApproval(ordno, styleid, Itemid)
                         select new PlanningBomApproval
                         {
                             Item = YD.Item,
                             Itemid = (int)YD.ItemID,
                             Plan_Type = YD.PlanType,
                             Actual_Qty = (decimal)YD.Qty,
                             Apply_Type = YD.ApplyType,
                             uom = YD.UOM,
                             uomid = YD.uomid,
                             AccreqId = (int)YD.AccReqId,
                             IsApproved = YD.Isapproved,
                             LockAcc = YD.LockAccs,
                             LockCon = YD.lockcon,
                             LockFabric = YD.LockFab,
                             LockPlanning = YD.LockPlanning,
                             LockYarn = YD.LockYarn,
                             LockPrgSeq = YD.IsSeQPrgmLock,
                             LockOrder = Convert.ToChar(YD.PA),


                             //Itemid = YD.Itemid,
                             //Item = YD.Item,
                             //Colorid = YD.Colorid,
                             //color = YD.Color,
                             //Sizeid = YD.Sizeid,
                             //size = YD.Size,
                             //Rate = YD.Rate,
                             //Quantity = (decimal)YD.prg_qty,
                             //curr = "",
                             //exchgerate = 0,
                             //amount = YD.Amount,
                             //itmgrpid = (int)YD.ItemGroupId,
                             //itmgrp = YD.ItemGroup,
                             //sno = (long)YD.Snumb,
                             //check = "false",
                             //Actual_Rate = 0,
                             //Actual_Qty = 0,
                             //Processid = 0,
                             //Cost_Defn_BOMid = YD.Cost_Defn_BOMid,
                             //Itmtype = YD.ItemType,
                             //Access_Type = YD.Access_Type
                         }).AsQueryable();

            return query;
        }


        public bool AddDetData(List<PlanningBomApproval> objmas, int MLockAcc, int MLockCon, int MLockFabric, char MLockOrder, bool MLockPlanning, bool MLockPrgSeq, int MLockYarn, string Ordno, int styleid)
        {
            bool reserved = false;

            DateTime date = DateTime.Now;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.Order_No == Ordno && b.StyleID == styleid).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.IsApproved = "Y";
                        Plan.LockAccs = MLockAcc;
                        Plan.LockCon = MLockCon;
                        Plan.LockFab = MLockFabric;
                        Plan.LockYarn = MLockYarn;
                        Plan.LockPlanning = MLockPlanning;
                    }

                    entities.SaveChanges();



                    //update in style table 
                    var Plan1 = entities.buy_ord_style.Where(b => b.order_no == Ordno && b.Styleid == styleid).FirstOrDefault();
                    if (Plan1 != null)
                    {
                        Plan1.IsSeQPrgmLock = MLockPrgSeq;

                    }

                    entities.SaveChanges();

                    //update in order table 
                    var Plan2 = entities.Buy_Ord_Mas.Where(b => b.Order_No == Ordno).FirstOrDefault();
                    if (Plan2 != null)
                    {
                        Plan2.PA = Convert.ToString(MLockOrder);

                    }

                    entities.SaveChanges();

                    //update in acc table 
                    foreach (var j in objmas)
                    {
                        var d = entities.Acc_Req_Mas.Where(a => a.AccReqID == j.AccreqId && a.ItemID == j.Itemid).FirstOrDefault();
                        if (d != null)
                        {
                            d.IsApproved = j.IsApproved;
                            d.App_Date = date;
                        }

                    }
                    entities.SaveChanges();



                    entities.SaveChanges();
                    //////////////
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PlanningConsumption-UpdateConDetData");
                }

            }
            return reserved;
        }

        public IQueryable<PlanningBomApproval> LoadBomdetEdit(string ordno, int styleid, int Itemid)
        {
            var query = (from YD in entities.proc_GetTrimsApproval(ordno, styleid, Itemid)
                         select new PlanningBomApproval
                         {
                             Item = YD.Item,
                             Itemid = (int)YD.ItemID,
                             Plan_Type = YD.PlanType,
                             Actual_Qty = (decimal)YD.Qty,
                             Apply_Type = YD.ApplyType,
                             uom = YD.UOM,
                             uomid = YD.uomid,
                             AccreqId = (int)YD.AccReqId,
                             IsApproved = YD.Isapproved,
                             LockAcc = YD.LockAccs,
                             LockCon = YD.lockcon,
                             LockFabric = YD.LockFab,
                             LockPlanning = YD.LockPlanning,
                             LockYarn = YD.LockYarn,
                             LockPrgSeq = YD.IsSeQPrgmLock,
                             LockOrder = Convert.ToChar(YD.PA),
                         }).AsQueryable();

            return query;
        }
    }
}
