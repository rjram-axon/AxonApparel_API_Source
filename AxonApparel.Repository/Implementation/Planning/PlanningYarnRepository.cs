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
    public class PlanningYarnRepository : IPlanningYarnRepository
    {
        PlanningEntities entities = new PlanningEntities();

        public int YPID = 0;
        public int Sno = 0;
        public int YDPID = 0;
        public int YPMID = 0;
        public int YPDID = 0;
        public IQueryable<PlanningYarn> GetFabricItemDetails(int PId)
        {



            IQueryable<PlanningYarn> query = (from Y in entities.Proc_GetFabricDetailsForYarn(PId)
                                              select new PlanningYarn
                                                {

                                                    YPlanmasID = Y.YPmasID,
                                                    PlanId = PId,
                                                    FabricID = Y.ItemID,
                                                    Fabric_ColorId = Y.ColorID,
                                                    Fabric_Weight = (Decimal)Y.Fabric_Req,
                                                    Fabric_type = Y.Fabric_type,
                                                    EntryDate = (DateTime)Y.Entrydate,
                                                    Fabric = Y.Fabric,
                                                    BColor = Y.BColor,
                                                    SlNo = (int)Y.SlNo,

                                                }).AsQueryable();

            return query;
        }
        public IList<PlanningYarnDyeing> GetDyeingItemDetails(int PlanID, int StyleRowId, int ItemId, int BColorId, int FabricId, int YDSlNo, decimal Qty)
        {



            var query = (from YD in entities.Proc_Apparel_GetYarnPlanningDyeDetails(StyleRowId)
                         select new PlanningYarnDyeing
                   {
                       GColor = YD.GColor,
                       Garment_ColorID = YD.GColorID,
                       CColorID = YD.CColorID,
                       CColor = YD.CColor,
                       Weight = 0,//(decimal)Qty,
                       GWeight = (decimal)Qty,//YD.GWeight,
                       Yarn_DyeColorID = YD.YDID,
                       Qty_Per = YD.QPer,
                       Purchase_Qty = YD.PQty,
                       Loss = YD.Loss,
                       ColorSeq = (int)YD.ColorSeq,
                       PerWeight = YD.PerWeight,
                       YPlanDetID = YD.YPlanDetID,
                       YPlanDyeID = YD.YPlanDyeID,
                       YDSlNo = YDSlNo,
                       SlNo = (int)YD.SNo,
                   }).AsQueryable();

            return query.ToList();
        }

        //Edit Yarn Loss
        public IList<PlanningYarnLoss> GetCompDetYarnLossDetails(int PId, int CompSno)
        {


            var query = (from Lp1 in entities.Proc_Apparel_GetPlanningYarnLossItemList(PId)
                         select new PlanningYarnLoss
                         {
                             SNo = Lp1.YDetSlno,
                             Loss_Per = Lp1.Loss_Per,
                             SlNo = Lp1.SlNo,
                             ProcessId = Lp1.ProcessId,
                             ProcessName = Lp1.Process,
                             YPlanDetID = Lp1.YPlanDetID,
                             YPlanLossID = Lp1.YPlanLossID,

                         }).AsQueryable();

            return query.ToList();
        }
        public bool AddDetData(List<Yarn_Plan_Mas> objPMas, List<Yarn_Plan_Det> objPDDet, List<Yarn_Plan_ProLoss> objPLDet, List<Yarn_Plan_Dyeing> objPDyet, PlanningYarn PlanYarnEnty)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    foreach (var detItem in objPDDet)
                    {

                        Sno = detItem.SlNo;
                        foreach (var item in objPMas)
                        {
                            if (Sno == item.SlNo && item.YPlanmasID == 0)
                            {
                                entities.Yarn_Plan_Mas.Add(item);
                                entities.SaveChanges();
                                YPID = item.YPlanmasID;

                            }

                        }
                        detItem.YPlanMasID = YPID;
                        entities.Yarn_Plan_Det.Add(detItem);
                        entities.SaveChanges();
                        YDPID = detItem.YPlanDetID;
                        foreach (var itemL in objPLDet)
                        {
                            if (detItem.SlNo == itemL.FSNo)
                            {
                                itemL.YPlanDetID = YDPID;
                                entities.Yarn_Plan_ProLoss.Add(itemL);
                            }
                        }
                        foreach (var itemDy in objPDyet)
                        {
                            if (detItem.SlNo == itemDy.YSNo && detItem.Dyeing_Req == true)
                            {
                                itemDy.YPlanDetID = YDPID;
                                entities.Yarn_Plan_Dyeing.Add(itemDy);
                            }
                        }
                    }


                    //  Insert into PrgSum
                    var Pg = entities.Sp_ProgSum_Yarn(PlanYarnEnty.OrderNo, PlanYarnEnty.CompanyId, PlanYarnEnty.PrgThr, PlanYarnEnty.StyleId, PlanYarnEnty.PlanId, PlanYarnEnty.Mode);
                    entities.SaveChanges();
                    //

                    ////Insert into BomDet
                    var Pg1 = entities.proc_Yarn_BOMUpdation(PlanYarnEnty.CompanyId, PlanYarnEnty.OrderNo, PlanYarnEnty.StyleId);
                    entities.SaveChanges();
                    //

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PlanYarnEnty.PlanId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "E";
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


        public bool DeleteData(int Id)
        {



            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {




                    var OrdNo = "";
                    var cmpid = 0;
                    var Pt = "W";
                    var styId = 0;
                    var PId = 0;
                    var Mode = "D";


                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    if (OQuery != null)
                    {
                        PId = OQuery.PlanID;
                        styId = OQuery.StyleID;
                        OrdNo = OQuery.Order_No;

                    }

                    var OQuery1 = entities.Buy_Ord_Mas.Where(b => b.Order_No == OrdNo).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        cmpid = (int)OQuery1.CompanyId;

                    }

                    //  Insert into PrgSum
                    var Pg = entities.Sp_ProgSum_Yarn(OrdNo, cmpid, Pt, styId, PId, Mode);
                    entities.SaveChanges();

                    var d = entities.Yarn_Plan_Mas.Where(c => c.PlanId == Id);

                    foreach (var dbSet in d)
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


                    ////delete into BomDet
                    var Pg1 = entities.proc_Yarn_BOMUpdation(cmpid, OrdNo, styId);
                    entities.SaveChanges();

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == Id).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "N";
                    }

                    entities.SaveChanges();
                    //       
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



        //Edit Yarn Det 

        public IList<PlanningYarnDet> GetEditYarnDetDetails(int YMID, string ODNo, int StyID)
        {
            var query = (from Ed in entities.Proc_Apparel_GetPlanningYarnEditDetItemList(YMID)
                         select new PlanningYarnDet
                         {
                             YplanDetID = Ed.YplanDetID,
                             YPlanMasID = Ed.YPlanMasID,
                             Knit_In_ItemId = Ed.Knit_In_ItemId,
                             Yarn = Ed.Item,
                             Knit_In_SizeID = Ed.Knit_In_SizeID,
                             Size = Ed.Size,
                             Knit_in_ColorID = Ed.Knit_in_ColorID,
                             Color = Ed.Color,
                             Knit_In_Per = (int)Ed.Knit_In_Per,
                             Knit_In_Qty = (decimal)Ed.Knit_In_Qty,
                             Loss_per = Ed.Loss_per,
                             Dyeing_Req = Ed.Dyeing_Req,
                             YSlNo = Ed.YSlNo,
                             SlNo = Ed.CompSlNo,
                             FabricID = Ed.FabricID,
                             BaseColorID = Ed.Fabric_ColorId,





                         }).AsQueryable();

            return query.ToList();
        }
        //Edit Yarn Dyeing
        public IList<PlanningYarnDyeing> GetYarnDyeingRepList(int PId, int IteID, int FabID, int bColorID, int StRowID, int YMaID, int YDeID, decimal Qty, int Dying, int YlNo)
        {

            int YDI = 0;

            if (YDeID == 0)
            {

                var YDQuery = entities.Yarn_Plan_Det.Where(b => b.YPlanMasID == YMaID).FirstOrDefault();
                if (YDQuery != null)
                {
                    YDI = YDQuery.YPlanDetID;
                }

            }
            else
            {
                YDI = YDeID;
            }


            var query = (from Ecnd in entities.Proc_GetFabricYarnDyeingEditDetails(PId, IteID, FabID, StRowID)
                         select new PlanningYarnDyeing
                         {





                             GColor = Ecnd.GColor,
                             Garment_ColorID = (int)Ecnd.GColorID,
                             CColorID = Ecnd.CColorID,
                             CColor = Ecnd.CColor,
                             Weight = (Dying == 0 ? 0 : Ecnd.PerWeight),
                             GWeight = (Ecnd.GWeight == 0 ? Qty : Ecnd.GWeight),
                             //GWeight = (YDeID == 0 ? Ecnd.GWeight : Qty),
                             //GWeight = Ecnd.GWeight,
                             Yarn_DyeColorID = Ecnd.YDID,
                             Qty_Per = Ecnd.QPer,
                             Purchase_Qty = Ecnd.PQty,
                             Loss = Ecnd.Loss,
                             ColorSeq = (int)Ecnd.Composition_Seq,
                             PerWeight = Ecnd.PerWeight,
                             YPlanDetID = Ecnd.YPlanDetID,
                             YPlanDyeID = Ecnd.YPlanDyeID,
                             YDSlNo = YlNo,
                             SlNo = (int)Ecnd.EYDetSlNo,
                             YPlanMasID = Ecnd.YPlanMasID,



                         }).AsQueryable();

            return query.ToList();


        }



        public bool UpdateYLossData(List<Yarn_Plan_ProLoss> objAdLDet)
        {
            var result = false;


            foreach (var i in objAdLDet)
            {
                var c = entities.Yarn_Plan_ProLoss.Where(a => a.YPlanLossID.Equals(i.YPlanLossID)).FirstOrDefault();
                if (c != null)
                {


                    c.FSNo = i.FSNo;
                    c.YPlanLossID = i.YPlanLossID;
                    c.YPlanDetID = i.YPlanDetID;
                    c.SlNo = i.SlNo;
                    c.ProcessId = i.ProcessId;
                    c.Loss_Per = i.Loss_Per;

                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }

        //public bool UpdateYMasData(List<Yarn_Plan_Mas> objAdMas)
        //{
        //    var result = false;

        //    foreach (var j in objAdMas)
        //    {
        //        var d = entities.Yarn_Plan_Mas.Where(a => a.YPlanmasID.Equals(j.YPlanmasID)).FirstOrDefault();
        //        if (d != null)
        //        {

        //            d.PlanId = j.PlanId;
        //            d.FabricID = j.FabricID;
        //            d.Fabric_ColorId = j.Fabric_ColorId;
        //            d.Fabric_Weight = j.Fabric_Weight;
        //            d.Fabric_type = j.Fabric_type;
        //            d.EntryDate = j.EntryDate;
        //            d.SlNo = j.SlNo;
        //            d.YPlanmasID = j.YPlanmasID;
        //        }
        //    }

        //    entities.SaveChanges();
        //    result = true;
        //    return result;
        //}
        //public bool UpdateYDetData(List<Yarn_Plan_Det> objAdDet)
        //{
        //    var result = false;

        //    int PId = 0;
        //    int styId = 0;
        //    string OrdNo = "";
        //    int cmpId = 0;


        //    foreach (var Pj in objAdDet)
        //    {
        //        var d = entities.Yarn_Plan_Mas.Where(a => a.YPlanmasID == Pj.YPlanMasID).FirstOrDefault();
        //        if (d != null)
        //        {

        //            d.YPlanmasID = Pj.YPlanMasID;

        //        }
        //        var OQuery = entities.Planning_Mas.Where(b => b.PlanID == d.PlanId).FirstOrDefault();
        //        if (OQuery != null)
        //        {
        //            PId = OQuery.PlanID;
        //            styId = OQuery.StyleID;
        //            OrdNo = OQuery.Order_No;
        //            cmpId = OQuery.CompanyID;

        //        }
        //    }



        //    foreach (var k in objAdDet)
        //    {
        //        var e = entities.Yarn_Plan_Det.Where(a => a.YPlanDetID.Equals(k.YPlanDetID)).FirstOrDefault();
        //        if (e != null)
        //        {

        //            e.Knit_In_ItemId = k.Knit_In_ItemId;
        //            e.Knit_In_SizeID = k.Knit_In_SizeID;
        //            e.Knit_in_ColorID = k.Knit_in_ColorID;
        //            e.Knit_In_Per = k.Knit_In_Per;
        //            e.Knit_In_Qty = k.Knit_In_Qty;
        //            e.Loss_per = k.Loss_per;
        //            e.Dyeing_Req = k.Dyeing_Req;
        //            e.SlNo = k.SlNo;
        //            e.YSNo = k.YSNo;
        //            e.Fabric_ColorId = k.Fabric_ColorId;
        //            e.FabricID = k.FabricID;
        //            e.YPlanMasID = k.YPlanMasID;
        //            e.YPlanDetID = k.YPlanDetID;
        //        }
        //    }

        //    entities.SaveChanges();

        //    ////Update into BomDet
        //    var Pg1 = entities.proc_Yarn_BOMUpdation(cmpId, OrdNo, styId);
        //    entities.SaveChanges();
        //    //


        //    //update in planning table 
        //    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
        //    if (Plan != null)
        //    {
        //        Plan.Yarn_Plan = "E";
        //    }


        //    result = true;
        //    return result;
        //}
        public bool UpdateYDyeingData(List<Yarn_Plan_Mas> objAdMas, List<Yarn_Plan_Det> objAdDet, List<Yarn_Plan_Dyeing> objAdDyeing)
        {



            int PId = 0;
            int styId = 0;
            string OrdNo = "";
            int cmpId = 0;
            int YMasId = 0;
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {


                    foreach (var j in objAdMas)
                    {
                        var d = entities.Yarn_Plan_Mas.Where(a => a.YPlanmasID.Equals(j.YPlanmasID)).FirstOrDefault();
                        if (d != null)
                        {

                            d.PlanId = j.PlanId;
                            d.FabricID = j.FabricID;
                            d.Fabric_ColorId = j.Fabric_ColorId;
                            d.Fabric_Weight = j.Fabric_Weight;
                            d.Fabric_type = j.Fabric_type;
                            d.EntryDate = j.EntryDate;
                            d.SlNo = j.SlNo;
                            d.YPlanmasID = j.YPlanmasID;
                        }
                    }

                    entities.SaveChanges();





                    foreach (var Pj in objAdDet)
                    {
                        var d = entities.Yarn_Plan_Mas.Where(a => a.YPlanmasID == Pj.YPlanMasID).FirstOrDefault();
                        if (d != null)
                        {

                            d.YPlanmasID = Pj.YPlanMasID;

                        }
                        var OQuery = entities.Planning_Mas.Where(b => b.PlanID == d.PlanId).FirstOrDefault();
                        if (OQuery != null)
                        {
                            PId = OQuery.PlanID;
                            styId = OQuery.StyleID;
                            OrdNo = OQuery.Order_No;
                            cmpId = OQuery.CompanyID;

                        }
                    }



                    foreach (var k in objAdDet)
                    {
                        var e = entities.Yarn_Plan_Det.Where(a => a.YPlanDetID.Equals(k.YPlanDetID)).FirstOrDefault();
                        if (e != null)
                        {

                            e.Knit_In_ItemId = k.Knit_In_ItemId;
                            e.Knit_In_SizeID = k.Knit_In_SizeID;
                            e.Knit_in_ColorID = k.Knit_in_ColorID;
                            e.Knit_In_Per = k.Knit_In_Per;
                            e.Knit_In_Qty = k.Knit_In_Qty;
                            e.Loss_per = k.Loss_per;
                            e.Dyeing_Req = k.Dyeing_Req;
                            e.SlNo = k.SlNo;
                            e.YSNo = k.YSNo;
                            e.Fabric_ColorId = k.Fabric_ColorId;
                            e.FabricID = k.FabricID;
                            e.YPlanMasID = k.YPlanMasID;
                            e.YPlanDetID = k.YPlanDetID;
                        }
                    }

                    entities.SaveChanges();

                    ////Update into BomDet
                    var Pg1 = entities.proc_Yarn_BOMUpdation(cmpId, OrdNo, styId);
                    entities.SaveChanges();
                    //


                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "E";
                    }

                    foreach (var Pj1 in objAdDyeing)
                    {
                        var d = entities.Yarn_Plan_Det.Where(a => a.YPlanDetID == Pj1.YPlanDetID).FirstOrDefault();
                        if (d != null)
                        {

                            d.YPlanDetID = Pj1.YPlanDetID;

                        }
                        var OQuery = entities.Yarn_Plan_Det.Where(b => b.YPlanDetID == d.YPlanDetID).FirstOrDefault();
                        if (OQuery != null)
                        {
                            YMasId = OQuery.YPlanMasID;

                        }
                    }

                    var OQuery1 = entities.Yarn_Plan_Mas.Where(b => b.YPlanmasID == YMasId).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        PId = OQuery1.PlanId;

                    }


                    var OQuery2 = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (OQuery2 != null)
                    {
                        styId = OQuery2.StyleID;
                        OrdNo = OQuery2.Order_No;
                        cmpId = OQuery2.CompanyID;

                    }
                    foreach (var l in objAdDyeing)
                    {
                        var d = entities.Yarn_Plan_Dyeing.Where(a => a.YPlanDyeID.Equals(l.YPlanDyeID)).FirstOrDefault();
                        if (d != null)
                        {

                            d.SlNo = l.SlNo;
                            d.Garment_ColorID = l.Garment_ColorID;
                            d.GWeight = l.GWeight;
                            d.Yarn_DyeColorID = l.Yarn_DyeColorID;
                            d.Qty_Per = l.Qty_Per;
                            d.Weight = l.Weight;
                            d.Purchase_Qty = l.Purchase_Qty;
                            d.Courses = l.Courses;
                            d.YSNo = l.YSNo;
                            d.YPlanDetID = l.YPlanDetID;
                            d.YPlanDyeID = l.YPlanDyeID;
                        }
                    }

                    entities.SaveChanges();


                    ////Update into BomDet
                    var Pg2 = entities.proc_Yarn_BOMUpdation(cmpId, OrdNo, styId);
                    entities.SaveChanges();
                    //

                    //       
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
        public bool AddDetLossData(List<Yarn_Plan_ProLoss> objPLossDet1, List<Yarn_Plan_Det> objPDet1)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    foreach (var itemE in objPDet1)
                    {

                        int YDetID = itemE.YPlanDetID;
                        int SlNo = itemE.SlNo;

                        foreach (var itemEL2 in objPLossDet1)
                        {


                            int PrId = itemEL2.ProcessId;

                            foreach (var itemEL in objPLossDet1)
                            {


                                //if (itemEL.FSNo == itemE.SlNo && itemEL.YPlanLossID == 0 && itemEL.ProcessId != PrId)
                                if (itemEL.FSNo == itemE.SlNo && itemEL.YPlanLossID == 0)
                                {
                                    itemEL.YPlanDetID = YDetID;
                                    entities.Yarn_Plan_ProLoss.Add(itemEL);
                                }


                            }

                        }
                        
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


        public bool AddDetDyeData(List<Yarn_Plan_Dyeing> objPYDetDye, List<Yarn_Plan_Det> objPDetDye)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    foreach (var itemEd in objPDetDye)
                    {

                        int YDetID = itemEd.YPlanDetID;
                        int YSNo = itemEd.YSNo;



                        foreach (var itemEND in objPYDetDye)
                        {
                            if (itemEND.YSNo == itemEd.YSNo && itemEND.YPlanDyeID == 0 && itemEND.Yarn_DyeColorID != 0)
                            {
                                itemEND.YPlanDetID = YDetID;
                                entities.Yarn_Plan_Dyeing.Add(itemEND);
                            }
                        }

                   

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
    }
}
