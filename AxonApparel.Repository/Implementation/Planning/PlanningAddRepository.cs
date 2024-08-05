using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;
using System.Data.SqlTypes;
using System.Transactions;
namespace AxonApparel.Repository
{
    public class PlanningAddRepository : IPlanningAddRepository
    {
        PlanningEntities entities = new PlanningEntities();

        public int IID = 0;
        public int CID = 0;
        public int SID = 0;

        public int PlanId = 0;
        public int CompSl = 0;
        public int CPlanSl = 0;
        public decimal Gramm = 0;
        public decimal Wght = 0;
        public int FWidth = 0;
        public int GWidth = 0;
        public int PQty = 0;
        public decimal length = 0;
        public decimal width = 0;
        public decimal gsm = 0;

        public int FPID = 0;
        public int FPDID = 0;
        public decimal BCorQty = 0;
        public decimal FCorQty = 0;

        public int YPID = 0;
        public int Sno = 0;
        public int YDPID = 0;
        public int YPMID = 0;
        public int YPDID = 0;

        public IQueryable<PlanningMain> GetDataAddList(int StyleRowId)
        {

            IQueryable<PlanningMain> query = (from cd in entities.Proc_Apparel_GetPlanningAddList(StyleRowId)
                                              select new PlanningMain
                                              {
                                                  ItemID = cd.ItemID,
                                                  Item = cd.Item,
                                                  OrderQty = (int)cd.quantity,
                                                  ProductionQty = (int)cd.ProductionQty,
                                                  PlanID = cd.PlanID,
                                                  Con_Plan = cd.Con_Plan,
                                                  Fabric_Plan = cd.Fabric_Plan,
                                                  Yarn_Plan = cd.Yarn_Plan,
                                                  Acc_Plan = cd.Acc_Plan,
                                                  ProdAmend = cd.PrdPlanAmend,

                                              }).AsQueryable();
            return query;
        }
        public IQueryable<PlanningMain> GetDataPlanDetails(int StyleRowId)
        {


            IQueryable<PlanningMain> query = (from a in entities.Proc_Apparel_GetPlanningAddListDetails(StyleRowId)
                                              select new PlanningMain
                                              {
                                                  Order_No = a.OrderNo,
                                                  Ref_no = a.RefNo,
                                                  Style = a.Style,
                                                  StyleID = a.StyleId,
                                                  Quantity = (int)a.ProdQty,
                                                  buyer = a.Buyer,
                                                  buyerid = a.BuyerId,
                                                  Company = a.Company,
                                                  CompanyID = a.CompanyId,
                                                  StyleRowid = StyleRowId,
                                                  PlanID = a.PlanID,
                                                  EDate = (DateTime)a.Order_Date,
                                                  GUom = a.GUom,
                                                  GUomID = a.GuomId,
                                                  GUomCon = a.ToGuom,
                                                  Job_Ord_No = a.WORKORDER,
                                                  BMasID = a.BmasId,
                                                  OrderQty = (int)a.Qty,
                                                  Type = a.OType,
                                                  StyleRate = (decimal)a.Rate,
                                                  Price=a.price,
                                                  ExRate=a.Exchange,
                                                  CurrId=a.Currencyid,
                                                  CurrName=a.currency,
                                                  Despatch_Closed=a.Despatch_Closed
                                              }).AsQueryable();

            return query;
        }
        public bool DeleteData(int Id)
        {
            bool reserved = false;

            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            // var Pt = "W";
            var styId = 0;
            var PId = 0;
            //var EMode = "D";
            //int StyRowId = 0;

            int PlId = 0;
            //int BomColorID = 0;
            //decimal BomCorQty = 0;
            //int BomSizeID = 0;
            //int BomMasId = 0;
            //int CBomColorId = 0;
            //int CBomSizeid = 0;
            //decimal CBomBaseQty = 0;

            var itemid = 0;
            //int CostMasId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {


                    //////////////////////////////////Delete Yarn Table
                    //var dy = entities.Yarn_Plan_Mas.Where(c => c.PlanId == Id);

                    //foreach (var dbSet in dy)
                    //{
                    //    YPMID = dbSet.YPlanmasID;

                    //    var Det = entities.Yarn_Plan_Det.Where(u => u.YPlanMasID == YPMID);

                    //    foreach (var u in Det)
                    //    {
                    //        YPDID = u.YPlanDetID;
                    //        var Det1 = entities.Yarn_Plan_ProLoss.Where(v => v.YPlanDetID == YPDID);

                    //        foreach (var v in Det1)
                    //        {

                    //            entities.Yarn_Plan_ProLoss.Remove(v);

                    //        }
                    //        var Det2 = entities.Yarn_Plan_Dyeing.Where(w => w.YPlanDetID == YPDID);
                    //        foreach (var w in Det2)
                    //        {

                    //            entities.Yarn_Plan_Dyeing.Remove(w);

                    //        }

                    //        entities.Yarn_Plan_Det.Remove(u);

                    //    }
                    //    entities.Yarn_Plan_Mas.Remove(dbSet);
                    //}


                    //entities.SaveChanges();




                    //  Insert into PrgSum
                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    if (OQuery != null)
                    {
                        PId = OQuery.PlanID;
                        styId = OQuery.StyleID;
                        OrdNo = OQuery.Order_No;
                        itemid = OQuery.ItemID;

                    }

                    var OQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        cmpid = (int)OQuery1.CompanyId;
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }

                    //////delete into BomDet
                    //var Pg1 = entities.proc_Yarn_BOMUpdation(cmpid, OrdNo, styId);
                    //entities.SaveChanges();
                    //////


                    ////  Insert into PrgSum
                    //var Pg = entities.Sp_ProgSum_Yarn(OrdNo, cmpid, Pt, styId, PId, EMode);
                    //entities.SaveChanges();

                    ///////////////////////////////
                    //////////////////////////////Fabric Table Delete


                    //delete the fabricpurchase


                    //var OQueryBom = entities.Buy_Ord_BOMMas.Where(b => b.Order_No == OrdNo && b.Styleid == styId && b.Access_Type == "F").FirstOrDefault();
                    //if (OQueryBom != null)
                    //{
                    //    BomMasId = (int)OQueryBom.Buy_Ord_BOMid;

                    //}

                    //var FbbomDet = entities.Buy_Ord_BOMDet.Where(u => u.Buy_Ord_BOMid == BomMasId);

                    //foreach (var Bom in FbbomDet)
                    //{
                    //    entities.Buy_Ord_BOMDet.Remove(Bom);
                    //}
                    //entities.SaveChanges();

                    //var Fbbommas = entities.Buy_Ord_BOMMas.Where(u => u.Buy_Ord_BOMid == BomMasId);

                    //foreach (var Bomas in Fbbommas)
                    //{
                    //    entities.Buy_Ord_BOMMas.Remove(Bomas);
                    //}
                    //entities.SaveChanges();

                    ////

                    ////delete the Costdefn


                    //var OQueryCost = entities.Cost_Defn_Mas.Where(b => b.Order_No == OrdNo && b.styleid == styId).FirstOrDefault();
                    //if (OQueryCost != null)
                    //{
                    //    CostMasId = (int)OQueryCost.Cost_Defn_id;

                    //}

                    //var cbomDet = entities.Cost_Defn_BOM.Where(u => u.Cost_Defn_id == CostMasId);

                    //foreach (var CBom in cbomDet)
                    //{
                    //    entities.Cost_Defn_BOM.Remove(CBom);
                    //}
                    //entities.SaveChanges();

                    //var costmas = entities.Cost_Defn_Mas.Where(u => u.Cost_Defn_id == CostMasId);

                    //foreach (var comas in costmas)
                    //{
                    //    entities.Cost_Defn_Mas.Remove(comas);
                    //}
                    //entities.SaveChanges();

                    ////

                    //var d = entities.Fabric_Plan.Where(c => c.PlanID == Id);

                    //foreach (var dbSet in d)
                    //{
                    //    FPDID = dbSet.FPlanId;
                    //    var CDet1 = entities.Fab_Plan_ProLoss.Where(u => u.FPlanId == FPDID);

                    //    foreach (var w in CDet1)
                    //    {
                    //        entities.Fab_Plan_ProLoss.Remove(w);
                    //    }
                    //}


                    //var CDet = entities.Fabric_Plan.Where(u => u.PlanID == Id);

                    //foreach (var v in CDet)
                    //{
                    //    entities.Fabric_Plan.Remove(v);
                    //}


                    //entities.SaveChanges();

                    //delete the programm summary table
                    //var FOQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    //if (FOQuery != null)
                    //{
                    //    PId = FOQuery.PlanID;
                    //    styId = FOQuery.StyleID;
                    //    OrdNo = FOQuery.Order_No;

                    //}

                    //var FOQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    //if (FOQuery1 != null)
                    //{
                    //    cmpid = (int)FOQuery1.CompanyId;

                    //}

                    //var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    //entities.SaveChanges();
                    //////////////////////////////

                    /////////////////////////////Consumption Table Delete        


                    //Delete the Programm_Summary Table 


                    //var PCOQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    //if (PCOQuery != null)
                    //{
                    //    OrdNo = PCOQuery.Order_No;
                    //    cmpid = PCOQuery.CompanyID;
                    //    styId = PCOQuery.StyleID;
                    //    itemid = PCOQuery.ItemID;
                    //}


                    //var COQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    //if (COQuery != null)
                    //{
                    //    OmasId = COQuery.Buy_Ord_MasId;
                    //}


                    var resultCon = entities.Proc_Apparel_DeleteConProgSum(OmasId, cmpid, styId, itemid);
                    entities.SaveChanges();
                    //

                    var CoDet = entities.Con_Plan.Where(w => w.PlanID == Id);
                    foreach (var w in CoDet)
                    {

                        entities.Con_Plan.Remove(w);

                    }
                    entities.SaveChanges();

                    var CmDet = entities.Comp_Plan_Mas.Where(w => w.PlanID == Id);
                    foreach (var C in CmDet)
                    {

                        entities.Comp_Plan_Mas.Remove(C);

                    }
                    entities.SaveChanges();




                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == OrdNo && b.StyleID == styId && b.CompanyID == cmpid && b.Acc_Plan == "E").FirstOrDefault();
                    if (OQueryP != null)
                    {
                        PlId = OQueryP.PlanID;

                        if (PlId > 0)
                        {

                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Con_Plan = "N";
                                AppMas.Fabric_Plan = "N";
                                AppMas.Yarn_Plan = "N";
                            }
                            entities.SaveChanges();
                        }

                    }
                    else
                    {
                        var PD = entities.Planning_Mas.Where(w => w.PlanID == Id && w.Acc_Plan == "N" && w.Con_Plan == "E");
                        foreach (var C in PD)
                        {

                            entities.Planning_Mas.Remove(C);

                        }
                        entities.SaveChanges();
                    }

                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }




        public bool DeleteFabData(int Id)
        {
            bool reserved = false;

            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var Pt = "W";
            var styId = 0;
            var PId = 0;
            var EMode = "D";
            //int StyRowId = 0;

            int PlId = 0;
            //int BomColorID = 0;
            //decimal BomCorQty = 0;
            //int BomSizeID = 0;
            int BomMasId = 0;
            //int CBomColorId = 0;
            //int CBomSizeid = 0;
            //decimal CBomBaseQty = 0;

            var itemid = 0;
            int CostMasId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {





                    //  Insert into PrgSum
                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    if (OQuery != null)
                    {
                        PId = OQuery.PlanID;
                        styId = OQuery.StyleID;
                        OrdNo = OQuery.Order_No;
                        itemid = OQuery.ItemID;

                    }

                    var OQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        cmpid = (int)OQuery1.CompanyId;
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }



                    ///////////////////////////////
                    //////////////////////////////Fabric Table Delete


                    //delete the fabricpurchase


                    var OQueryBom = entities.Buy_Ord_BOMMas.Where(b => b.Order_No == OrdNo && b.Styleid == styId && b.Access_Type == "F").FirstOrDefault();
                    if (OQueryBom != null)
                    {
                        BomMasId = (int)OQueryBom.Buy_Ord_BOMid;

                    }

                    var FbbomDet = entities.Buy_Ord_BOMDet.Where(u => u.Buy_Ord_BOMid == BomMasId);

                    foreach (var Bom in FbbomDet)
                    {
                        entities.Buy_Ord_BOMDet.Remove(Bom);
                    }
                    entities.SaveChanges();

                    var Fbbommas = entities.Buy_Ord_BOMMas.Where(u => u.Buy_Ord_BOMid == BomMasId);

                    foreach (var Bomas in Fbbommas)
                    {
                        entities.Buy_Ord_BOMMas.Remove(Bomas);
                    }
                    entities.SaveChanges();

                    //

                    //delete the Costdefn


                    var OQueryCost = entities.Cost_Defn_Mas.Where(b => b.Order_No == OrdNo && b.styleid == styId).FirstOrDefault();
                    if (OQueryCost != null)
                    {
                        CostMasId = (int)OQueryCost.Cost_Defn_id;

                    }

                    var cbomDet = entities.Cost_Defn_BOM.Where(u => u.Cost_Defn_id == CostMasId);

                    foreach (var CBom in cbomDet)
                    {
                        entities.Cost_Defn_BOM.Remove(CBom);
                    }
                    entities.SaveChanges();

                    var costmas = entities.Cost_Defn_Mas.Where(u => u.Cost_Defn_id == CostMasId);

                    foreach (var comas in costmas)
                    {
                        entities.Cost_Defn_Mas.Remove(comas);
                    }
                    entities.SaveChanges();

                    //

                    var d = entities.Fabric_Plan.Where(c => c.PlanID == Id);

                    foreach (var dbSet in d)
                    {
                        FPDID = dbSet.FPlanId;
                        var CDet1 = entities.Fab_Plan_ProLoss.Where(u => u.FPlanId == FPDID);

                        foreach (var w in CDet1)
                        {
                            entities.Fab_Plan_ProLoss.Remove(w);
                        }
                    }


                    var CDet = entities.Fabric_Plan.Where(u => u.PlanID == Id);

                    foreach (var v in CDet)
                    {
                        entities.Fabric_Plan.Remove(v);
                    }


                    entities.SaveChanges();

                    //delete the programm summary table
                    var FOQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    if (FOQuery != null)
                    {
                        PId = FOQuery.PlanID;
                        styId = FOQuery.StyleID;
                        OrdNo = FOQuery.Order_No;

                    }

                    var FOQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    if (FOQuery1 != null)
                    {
                        cmpid = (int)FOQuery1.CompanyId;

                    }

                    var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();
                    //////////////////////////////


                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == OrdNo && b.StyleID == styId && b.CompanyID == cmpid && b.Con_Plan == "E").FirstOrDefault();
                    if (OQueryP != null)
                    {
                        PlId = OQueryP.PlanID;

                        if (PlId > 0)
                        {

                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Con_Plan = "E";
                                AppMas.Fabric_Plan = "N";
                                AppMas.Yarn_Plan = "N";
                            }
                            entities.SaveChanges();
                        }

                    }
                    else
                    {
                        var PD = entities.Planning_Mas.Where(w => w.PlanID == Id && w.Con_Plan == "N");
                        foreach (var C in PD)
                        {

                            entities.Planning_Mas.Remove(C);

                        }
                        entities.SaveChanges();
                    }

                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }


        public bool DeleteYarnData(int Id)
        {
            bool reserved = false;

            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var Pt = "W";
            var styId = 0;
            var PId = 0;
            var EMode = "D";
            //int StyRowId = 0;

            //int PlId = 0;
            //int BomColorID = 0;
            //decimal BomCorQty = 0;
            //int BomSizeID = 0;
            //int BomMasId = 0;
            //int CBomColorId = 0;
            //int CBomSizeid = 0;
            //decimal CBomBaseQty = 0;

            var itemid = 0;
            //int CostMasId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {


                    ////////////////////////////////Delete Yarn Table
                    var dy = entities.Yarn_Plan_Mas.Where(c => c.PlanId == Id);

                    foreach (var dbSet in dy)
                    {
                        YPMID = dbSet.YPlanmasID;

                        var Det = entities.Yarn_Plan_Det.Where(u => u.YPlanMasID == YPMID);

                        foreach (var u in Det)
                        {
                            YPDID = u.YPlanDetID;
                            var Det1 = entities.Yarn_Plan_ProLoss.Where(v => v.YPlanDetID == YPDID);

                            foreach (var v in Det1)
                            {

                                entities.Yarn_Plan_ProLoss.Remove(v);

                            }
                            var Det2 = entities.Yarn_Plan_Dyeing.Where(w => w.YPlanDetID == YPDID);
                            foreach (var w in Det2)
                            {

                                entities.Yarn_Plan_Dyeing.Remove(w);

                            }

                            entities.Yarn_Plan_Det.Remove(u);

                        }
                        entities.Yarn_Plan_Mas.Remove(dbSet);
                    }


                    entities.SaveChanges();




                    //  Insert into PrgSum
                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    if (OQuery != null)
                    {
                        PId = OQuery.PlanID;
                        styId = OQuery.StyleID;
                        OrdNo = OQuery.Order_No;
                        itemid = OQuery.ItemID;

                    }

                    var OQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        cmpid = (int)OQuery1.CompanyId;
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }

                    ////delete into BomDet
                    var Pg1 = entities.proc_Yarn_BOMUpdation(cmpid, OrdNo, styId);
                    entities.SaveChanges();
                    ////


                    //  Insert into PrgSum
                    var Pg = entities.Sp_ProgSum_Yarn(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();

                    ///////////////////////////////
                    //////////////////////////////Fabric Table Delete


                    //delete the fabricpurchase


                    //var OQueryBom = entities.Buy_Ord_BOMMas.Where(b => b.Order_No == OrdNo && b.Styleid == styId && b.Access_Type == "F").FirstOrDefault();
                    //if (OQueryBom != null)
                    //{
                    //    BomMasId = (int)OQueryBom.Buy_Ord_BOMid;

                    //}

                    //var FbbomDet = entities.Buy_Ord_BOMDet.Where(u => u.Buy_Ord_BOMid == BomMasId);

                    //foreach (var Bom in FbbomDet)
                    //{
                    //    entities.Buy_Ord_BOMDet.Remove(Bom);
                    //}
                    //entities.SaveChanges();

                    //var Fbbommas = entities.Buy_Ord_BOMMas.Where(u => u.Buy_Ord_BOMid == BomMasId);

                    //foreach (var Bomas in Fbbommas)
                    //{
                    //    entities.Buy_Ord_BOMMas.Remove(Bomas);
                    //}
                    //entities.SaveChanges();

                    ////

                    ////delete the Costdefn


                    //var OQueryCost = entities.Cost_Defn_Mas.Where(b => b.Order_No == OrdNo && b.styleid == styId).FirstOrDefault();
                    //if (OQueryCost != null)
                    //{
                    //    CostMasId = (int)OQueryCost.Cost_Defn_id;

                    //}

                    //var cbomDet = entities.Cost_Defn_BOM.Where(u => u.Cost_Defn_id == CostMasId);

                    //foreach (var CBom in cbomDet)
                    //{
                    //    entities.Cost_Defn_BOM.Remove(CBom);
                    //}
                    //entities.SaveChanges();

                    //var costmas = entities.Cost_Defn_Mas.Where(u => u.Cost_Defn_id == CostMasId);

                    //foreach (var comas in costmas)
                    //{
                    //    entities.Cost_Defn_Mas.Remove(comas);
                    //}
                    //entities.SaveChanges();

                    ////

                    //var d = entities.Fabric_Plan.Where(c => c.PlanID == Id);

                    //foreach (var dbSet in d)
                    //{
                    //    FPDID = dbSet.FPlanId;
                    //    var CDet1 = entities.Fab_Plan_ProLoss.Where(u => u.FPlanId == FPDID);

                    //    foreach (var w in CDet1)
                    //    {
                    //        entities.Fab_Plan_ProLoss.Remove(w);
                    //    }
                    //}


                    //var CDet = entities.Fabric_Plan.Where(u => u.PlanID == Id);

                    //foreach (var v in CDet)
                    //{
                    //    entities.Fabric_Plan.Remove(v);
                    //}


                    //entities.SaveChanges();

                    //delete the programm summary table
                    //var FOQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    //if (FOQuery != null)
                    //{
                    //    PId = FOQuery.PlanID;
                    //    styId = FOQuery.StyleID;
                    //    OrdNo = FOQuery.Order_No;

                    //}

                    //var FOQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    //if (FOQuery1 != null)
                    //{
                    //    cmpid = (int)FOQuery1.CompanyId;

                    //}

                    //var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    //entities.SaveChanges();
                    //////////////////////////////

                    /////////////////////////////Consumption Table Delete        


                    //Delete the Programm_Summary Table 


                    //var PCOQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    //if (PCOQuery != null)
                    //{
                    //    OrdNo = PCOQuery.Order_No;
                    //    cmpid = PCOQuery.CompanyID;
                    //    styId = PCOQuery.StyleID;
                    //    itemid = PCOQuery.ItemID;
                    //}


                    //var COQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    //if (COQuery != null)
                    //{
                    //    OmasId = COQuery.Buy_Ord_MasId;
                    //}


                    //var resultCon = entities.Proc_Apparel_DeleteConProgSum(OmasId, cmpid, styId, itemid);
                    //entities.SaveChanges();
                    ////

                    //var CoDet = entities.Con_Plan.Where(w => w.PlanID == Id);
                    //foreach (var w in CoDet)
                    //{

                    //    entities.Con_Plan.Remove(w);

                    //}
                    //entities.SaveChanges();

                    //var CmDet = entities.Comp_Plan_Mas.Where(w => w.PlanID == Id);
                    //foreach (var C in CmDet)
                    //{

                    //    entities.Comp_Plan_Mas.Remove(C);

                    //}
                    //entities.SaveChanges();

                    


                    var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PId).FirstOrDefault();
                    if (AppMas != null)
                    {                       
                        AppMas.Yarn_Plan = "N";
                    }
                    entities.SaveChanges();



                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }
            }
            return reserved;
        }
    }
}
