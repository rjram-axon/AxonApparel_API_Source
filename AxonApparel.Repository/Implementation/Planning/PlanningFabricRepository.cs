//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using System.Data.Entity;
//using System.ComponentModel.DataAnnotations;
//using AxonApparel.Domain;
//using System.Data.SqlTypes;
//using System.Transactions;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using AxonApparel.Domain;
namespace AxonApparel.Repository
{
    public class PlanningFabricRepository : IPlanningFabricRepository
    {

        PlanningEntities entities = new PlanningEntities();
        public int FPID = 0;
        public int FPDID = 0;
        public decimal BCorQty = 0;
        public decimal FCorQty = 0;
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<PlanningFabric> GetCompFabricItemDetails(int PId)
        {



            //IQueryable<PlanningFabric> query = (from o in entities.Proc_Apparel_GetPlanningFabricComItemList(PId)
            //                                    select new PlanningFabric
            //                                     {

            //                                         ComponentName = o.item,
            //                                         ComponentID = o.ItemId,
            //                                         Fabric_Type = o.Fabric_type,
            //                                         CompSlNo = o.CompSlNo,
            //                                         kgs = o.Weight,
            //                                         PanParts = o.PanelParts,
            //                                         Comp_Plan_MasID = o.Comp_Plan_MasID,

            //                                     }).AsQueryable();

            //return query;


            List<Domain.PlanningFabric> lstemployee = new List<Domain.PlanningFabric>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanningFabricComItemList", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PID", PId);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningFabric employee = new Domain.PlanningFabric();
                    employee.ComponentName = (rdr["item"]).ToString();
                    employee.ComponentID = Convert.ToInt32(rdr["ItemId"]);
                    employee.Fabric_Type = (rdr["Fabric_type"]).ToString();
                    employee.CompSlNo = Convert.ToInt32(rdr["CompSlNo"]);
                    employee.kgs = Convert.ToDecimal(rdr["Weight"]);
                    employee.PanParts = Convert.ToInt32(rdr["PanelParts"]);
                    employee.Comp_Plan_MasID = Convert.ToInt32(rdr["Comp_Plan_MasID"]);
                    employee.GColor = (rdr["GColor"]).ToString();
                    employee.GColorId = Convert.ToInt32(rdr["GColorId"]);
                    employee.FabircId = Convert.ToInt32(rdr["FabricID"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;

        }
        public IList<PlanningFabricDetails> GetCompDetFabricItemDetails(int PId, int CompSno)
        {


            var query = (from p in entities.Proc_Apparel_GetPlanningFabricComDetItemList(PId, CompSno)
                         select new PlanningFabricDetails
                         {
                             ColorID = p.ColorID,
                             Color = p.Color,
                             Size = p.Size,
                             SizeId = p.SizeID,
                             Prdn_Qty = (int)p.PrdnQty,
                             Weight = p.Weight,
                             ActWeight = p.Weight,
                             Length = p.Length,
                             Width = p.Width,
                             Grammage = (int)p.Grammage,
                             Wmetres = p.WMetres,
                             SizeRow = (int)p.sizerow,
                             FinishWidthID = p.FinishWidthID,
                             GreyWidthID = p.GreyWidthID,
                             FinishWidth = p.FinishWidth,
                             GreyWidth = p.GreyWidth,
                             FabricID = p.FabricID,
                             Fabric = p.Fabric,
                             FabUomID = p.FabuomID,
                             FabricType = p.Fabric_Type,
                             PlanID = PId,
                             CompSlNo = p.CompSlNo,
                             FPlanId = 0,
                             FGsm = "",
                             KGsm = "",                             
                             FColorID = p.ColorID,
                             Fcolor = p.Color,
                             snumb = (int)p.Snumb,
                             guage = "",
                             texture = "",
                             LoopLen = "",
                             content = "",
                             Woven_Req_InMtrs = p.PrdnQty
                         }).AsQueryable();

            return query.ToList();
        }
        public IList<PlanLoss> GetCompDetFabricLossDetails(int PId, int CompSno)
        {
            int Fplanid = 0;

            var query = (from Lp in entities.Proc_Apparel_GetPlanningFabricLossItemList(PId, CompSno, Fplanid)
                         select new PlanLoss
                         {
                             CompSNo = Lp.CompSlNo,
                             Loss_Per = Lp.Loss_Per,
                             SlNo = Lp.SlNo,
                             ProcessId = Lp.ProcessId,
                             ProcessName = Lp.Process,
                             FPlanId = 0,
                             FLPlanID = 0,

                         }).AsQueryable();

            return query.ToList();
        }
        public IList<PlanningFabricDetails> GetConFabricPlanList(int PId, int ComSNo)
        {


            var query = (from Ecnp in entities.Proc_Apparel_GetPlanningFabricComDetEditItemList(PId, ComSNo)
                         select new PlanningFabricDetails
                         {

                             CompSlNo = Ecnp.CompSlNo,
                             ColorID = Ecnp.ColorID,
                             SizeId = Ecnp.SizeID,
                             Prdn_Qty = (int)Ecnp.PrdnQty,
                             Color = Ecnp.Color,
                             Size = Ecnp.Size,
                             Length = Ecnp.Length,
                             Width = Ecnp.Width,
                             Grammage = (int)Ecnp.Grammage,
                             Weight = Ecnp.Weight,
                             GreyWidth = Ecnp.GreyWidth,
                             GreyWidthID = Ecnp.GreyWidthID,
                             FinishWidth = Ecnp.FinishWidth,
                             FinishWidthID = Ecnp.FinishWidthID,
                             FPlanId = Ecnp.FPlanId,
                             PlanID = Ecnp.PlanID,
                             Woven_Req_InMtrs = (int)Ecnp.Wpm,
                             LossGain = (int)Ecnp.LossGain,
                             FabricID = Ecnp.FabricID,
                             FabricType = Ecnp.Fabric_type,
                             BColorID = Ecnp.BaseColorID,
                             BColorPQty = (int)Ecnp.BColorPur_Qty,
                             FColorID = Ecnp.FinishColorID,
                             FColorPQty = (int)Ecnp.FColorPur_Qty,
                             PColorID = Ecnp.PrintColorId,
                             EntryDate = (DateTime)Ecnp.EntryDate,
                             KGsm = Ecnp.Knit_GSM == "" ? "" : Ecnp.Knit_GSM,
                             FGsm = Ecnp.Fin_GSM == "" ? "" : Ecnp.Fin_GSM,
                             snumb = (int)Ecnp.Snumb
                         }).AsQueryable();

            return query.ToList();



        }
        public bool AddDetData(List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, PlanningFabric Fplan)
        {
            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int BomColorID = 0;
                    decimal BomCorQty = 0;
                    int BomSizeID = 0;
                    int BomMasId = 0;
                    int CBomColorId = 0;
                    int CBomSizeid = 0;
                    decimal CBomBaseQty = 0;

                    foreach (var item in objPDet)
                    {

                        entities.Fabric_Plan.Add(item);
                        entities.SaveChanges();
                        FPID = item.FPlanId;

                        foreach (var itemL in objPLDet)
                        {
                            if (item.CompSlNo == itemL.CompSlNo)
                            {
                                itemL.FPlanId = FPID;
                                entities.Fab_Plan_ProLoss.Add(itemL);
                            }
                        }

                    }

                    //For BaseFinColorPurchase

                    foreach (var itemBQty in objPDet)
                    {
                        BCorQty = itemBQty.BColorPur_Qty;
                        FCorQty = (decimal)itemBQty.FColorPur_Qty;
                    }

                    // delete the bommas & bomdet table for fabric purchase
                    if ((BCorQty > 0) || (FCorQty > 0))
                    {
                        var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == Fplan.OrderNo) && (b.Styleid == Fplan.StyleId)).FirstOrDefault();
                        if (OQuery1 != null)
                        {
                            BomMasId = OQuery1.Buy_Ord_BOMid;
                        }
                    }


                    if (BomMasId == 0)
                    {
                        if ((BCorQty > 0) || (FCorQty > 0))
                        {

                            var OrderNo = Fplan.OrderNo;
                            var StyleId = Fplan.StyleId;
                            var CompId = Fplan.CompanyId;
                            var Access_Type = "F";
                            var Prog_Thru = "B";
                            var Pg = entities.Proc_Apparel_GetPlanningFabricInsertFabBFPurQtyMas(OrderNo, StyleId, Access_Type, Prog_Thru, CompId);
                            entities.SaveChanges();
                        }
                    }
                    var OQuery = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == Fplan.OrderNo) && (b.Styleid == Fplan.StyleId)).FirstOrDefault();
                    if (OQuery != null)
                    {
                        BomMasId = OQuery.Buy_Ord_BOMid;

                    }

                    //base color 
                    foreach (var item1 in objPDet)
                    {

                        if (CBomColorId == item1.BaseColorID && CBomSizeid == item1.Table_WidthID)
                        {

                            if (item1.BColorPur_Qty > 0)
                            {
                                BomCorQty = BomCorQty + item1.BColorPur_Qty;
                            }


                            //delete the bomdet 
                            var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                            entities.SaveChanges();


                            ////save the bomdet 
                            //var Pg2 = entities.Proc_Apparel_GetPlanningFabricInsertFabDetPurQty1(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId);
                            //entities.SaveChanges();
                        }

                        else
                        {
                            if ((item1.BColorPur_Qty > 0))
                            {

                                BCorQty = item1.BColorPur_Qty;

                                if (BCorQty > 0)
                                {
                                    BomColorID = item1.BaseColorID;
                                    BomCorQty = item1.BColorPur_Qty;
                                    BomSizeID = item1.Table_WidthID;
                                }



                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                                entities.SaveChanges();
                            }
                        }



                        CBomColorId = BomColorID;
                        CBomSizeid = BomSizeID;
                        CBomBaseQty = BomCorQty;
                    }
                    //
                    //finish color
                    foreach (var item1 in objPDet)
                    {

                        if (CBomColorId == item1.FinishColorID && CBomSizeid == item1.Fab_WidthId)
                        {

                            if (item1.FColorPur_Qty > 0)
                            {
                                BomCorQty = BomCorQty + (decimal)item1.FColorPur_Qty;
                            }


                            //delete the bomdet 
                            var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                            entities.SaveChanges();


                        }

                        else
                        {
                            if ((item1.FColorPur_Qty > 0))
                            {


                                FCorQty = (decimal)item1.FColorPur_Qty;
                                if (FCorQty > 0)
                                {
                                    BomColorID = item1.FinishColorID;
                                    BomCorQty = (decimal)item1.FColorPur_Qty;
                                    BomSizeID = item1.Fab_WidthId;
                                }


                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                                entities.SaveChanges();

                            }
                        }

                        CBomColorId = BomColorID;
                        CBomBaseQty = BomCorQty;
                        CBomSizeid = BomSizeID;
                    }
                    //--close BaseFinColorPurchase


                    //Insert into PrgSum
                    var Pg3 = entities.sp_ProgSum_Fabric1(Fplan.OrderNo, Fplan.CompanyId, Fplan.PrgThr, Fplan.StyleId, Fplan.PlanID, Fplan.Mode);
                    //

                    entities.SaveChanges();


                    //Update  into Cost and Plan
                    var Pg4 = entities.Proc_Apparel_GetPlanFabricCostUpdate(Fplan.OrderNo, Fplan.StyleId, Fplan.PlanID);
                    //

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

        public bool UpdateConDetData(List<Fab_Plan_ProLoss> objCmDet, List<Fabric_Plan> objCnDet, PlanningFabric Fplan)
        {
            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    int BomMasId = 0;
                    int BomColorID = 0;
                    decimal BomCorQty = 0;
                    int BomSizeID = 0;
                    int CBomColorId = 0;
                    int CBomSizeid = 0;
                    decimal CBomBaseQty = 0;


                    foreach (var i in objCmDet)
                    {
                        var c = entities.Fab_Plan_ProLoss.Where(a => a.FLPlanID.Equals(i.FLPlanID)).FirstOrDefault();
                        if (c != null)
                        {


                            c.CompSlNo = i.CompSlNo;
                            c.FLPlanID = i.FLPlanID;
                            c.FPlanId = i.FPlanId;
                            c.SlNo = i.SlNo;
                            c.ProcessId = i.ProcessId;
                            c.Loss_Per = i.Loss_Per;

                        }
                    }


                    foreach (var j in objCnDet)
                    {
                        var d = entities.Fabric_Plan.Where(a => a.FPlanId.Equals(j.FPlanId)).FirstOrDefault();
                        if (d != null)
                        {

                            d.FPlanId = j.FPlanId;
                            d.CompSlNo = j.CompSlNo;
                            d.ColorID = j.ColorID;
                            d.SizeId = j.SizeId;
                            d.Prdn_Qty = (int)j.Prdn_Qty;
                            d.Grammage = (int)j.Grammage;
                            d.Fabric_Req = j.Fabric_Req;
                            d.Woven_Req_InMtrs = j.Woven_Req_InMtrs;
                            d.Table_WidthID = j.Table_WidthID;
                            d.Fab_WidthId = j.Fab_WidthId;
                            d.FPlanId = j.FPlanId;
                            d.PlanID = j.PlanID;
                            d.LossGain = (int)j.LossGain;
                            d.FabricId = j.FabricId;
                            d.Fabric_type = j.Fabric_type;
                            d.BaseColorID = j.BaseColorID;
                            d.BColorPur_Qty = (int)j.BColorPur_Qty;
                            d.FinishColorID = j.FinishColorID;
                            d.FColorPur_Qty = (int)j.FColorPur_Qty;
                            d.PrintColorId = j.PrintColorId;
                            d.EntryDate = (DateTime)j.EntryDate;
                            d.Knit_GSM = j.Knit_GSM;
                            d.Fin_GSM = j.Fin_GSM;
                        }
                    }


                    entities.SaveChanges();


                    //For BaseFinColorPurchase

                    foreach (var itemBQty in objCnDet)
                    {
                        BCorQty = itemBQty.BColorPur_Qty;
                        FCorQty = (decimal)itemBQty.FColorPur_Qty;
                    }

                    // delete the bommas & bomdet table for fabric purchase
                    if ((BCorQty > 0) || (FCorQty > 0))
                    {
                        var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == Fplan.OrderNo) && (b.Styleid == Fplan.StyleId)).FirstOrDefault();
                        if (OQuery1 != null)
                        {
                            BomMasId = OQuery1.Buy_Ord_BOMid;
                        }
                    }
                    foreach (var item1 in objCnDet)
                    {

                        if (CBomColorId == item1.BaseColorID && CBomSizeid == item1.Table_WidthID)
                        {

                            if (item1.BColorPur_Qty > 0)
                            {
                                BomCorQty = BomCorQty + item1.BColorPur_Qty;
                            }


                            //delete the bomdet 
                            var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabUpdateForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                            entities.SaveChanges();

                        }

                        else
                        {
                            if ((item1.BColorPur_Qty > 0))
                            {

                                BCorQty = item1.BColorPur_Qty;

                                if (BCorQty > 0)
                                {
                                    BomColorID = item1.BaseColorID;
                                    BomCorQty = item1.BColorPur_Qty;
                                    BomSizeID = item1.Table_WidthID;
                                }



                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabUpdateForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                                entities.SaveChanges();
                            }
                        }



                        CBomColorId = BomColorID;
                        CBomSizeid = BomSizeID;
                        CBomBaseQty = BomCorQty;
                    }
                    //
                    //finish color
                    foreach (var item1 in objCnDet)
                    {

                        if (CBomColorId == item1.FinishColorID && CBomSizeid == item1.Fab_WidthId)
                        {

                            if (item1.FColorPur_Qty > 0)
                            {
                                BomCorQty = BomCorQty + (decimal)item1.FColorPur_Qty;
                            }

                            ////delete the bomdet 
                            //var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty1(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                            //entities.SaveChanges();
                            //delete the bomdet 
                            var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabUpdateForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                            entities.SaveChanges();

                            ////save the bomdet 
                            //var Pg2 = entities.Proc_Apparel_GetPlanningFabricInsertFabDetPurQty1(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId);
                            //entities.SaveChanges();
                        }

                        else
                        {
                            if ((item1.FColorPur_Qty > 0))
                            {


                                FCorQty = (decimal)item1.FColorPur_Qty;
                                if (FCorQty > 0)
                                {
                                    BomColorID = item1.FinishColorID;
                                    BomCorQty = (decimal)item1.FColorPur_Qty;
                                    BomSizeID = item1.Fab_WidthId;
                                }


                                //var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDetPurQty1(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId);
                                //entities.SaveChanges();
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabUpdateForMultiplePurQty(item1.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, Fplan.CompanyId, Fplan.OrderNo, Fplan.StyleId);
                                entities.SaveChanges();

                            }
                        }

                        CBomColorId = BomColorID;
                        CBomBaseQty = BomCorQty;
                        CBomSizeid = BomSizeID;
                    }
                    //--close BaseFinColorPurchase
                    //Insert into PrgSum in Edit Mode
                    var Pg = entities.sp_ProgSum_Fabric1(Fplan.OrderNo, Fplan.CompanyId, Fplan.PrgThr, Fplan.StyleId, Fplan.PlanID, Fplan.Mode);
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


        public bool AddDetLossData(List<Fab_Plan_ProLoss> objPLossDet, List<Fabric_Plan> objPDet)
        {
            bool reserved = false;

            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    foreach (var itemE in objPDet)
                    {

                        int FPNID = itemE.FPlanId;
                        int CompSNo = itemE.CompSlNo;

                        foreach (var itemEL in objPLossDet)
                        {
                            if (itemEL.CompSlNo == itemE.CompSlNo && itemEL.FLPlanID == 0)
                            {
                                itemEL.FPlanId = FPNID;
                                entities.Fab_Plan_ProLoss.Add(itemEL);
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



        public bool DeleteData(List<Fabric_Plan> objAdConDet, PlanningFabric Fplan)
        {
            bool reserved = false;

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
                    var BomMasId = 0;



                    //delete the fabricpurchase

                    var OQuery4 = entities.Planning_Mas.Where(b => b.PlanID == Fplan.PlanID).FirstOrDefault();
                    if (OQuery4 != null)
                    {
                        PId = OQuery4.PlanID;
                        styId = OQuery4.StyleID;
                        OrdNo = OQuery4.Order_No;

                    }

                    var OQuery3 = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == OrdNo) && (b.Styleid == styId)).FirstOrDefault();
                    if (OQuery3 != null)
                    {
                        BomMasId = OQuery3.Buy_Ord_BOMid;

                    }


                    foreach (var v in objAdConDet)
                    {
                        var result6 = entities.Proc_Apparel_GetPlanningFabricDeletePurQty(PId, v.FabricId, v.BaseColorID, v.FinishColorID, v.Table_WidthID, v.Fab_WidthId, v.BColorPur_Qty, v.FColorPur_Qty);
                        entities.SaveChanges();
                    }




                    //
                    var d = entities.Fabric_Plan.Where(c => c.PlanID == Fplan.PlanID);

                    foreach (var dbSet in d)
                    {
                        FPDID = dbSet.FPlanId;
                        var CDet1 = entities.Fab_Plan_ProLoss.Where(u => u.FPlanId == FPDID);

                        foreach (var w in CDet1)
                        {
                            entities.Fab_Plan_ProLoss.Remove(w);
                        }
                    }


                    var CDet = entities.Fabric_Plan.Where(u => u.PlanID == Fplan.PlanID);

                    foreach (var v in CDet)
                    {
                        entities.Fabric_Plan.Remove(v);
                    }


                    entities.SaveChanges();


                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == Fplan.PlanID).FirstOrDefault();
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

                    var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, Mode);
                    entities.SaveChanges();


                    //update in planning table 
                    var result4 = entities.Proc_Apparel_GetFabricPlanningTableUpdate(PId);
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


        public IQueryable<PlanningFabricDetails> GetColor()
        {

            IQueryable<PlanningFabricDetails> query = (from o in entities.Proc_Apparel_Getfabriccolor()
                                                       select new PlanningFabricDetails
                                                {
                                                    ColorID = o.ColorID,
                                                    Color = o.color


                                                }).AsQueryable();

            return query;
        }


        public IQueryable<PlanningFabricDetails> GetPrintColor()
        {
            IQueryable<PlanningFabricDetails> query = (from o in entities.Proc_Apparel_Getprintcolor()
                                                       select new PlanningFabricDetails
                                                       {
                                                           ColorID = o.ColorID,
                                                           Color = o.color


                                                       }).AsQueryable();

            return query;
        }


        public IList<PlanningFabricDetails> GetCompDetFabricTotItemDetails(int PId)
        {
            var query = (from p in entities.Proc_Apparel_GetPlanningFabricComDetTotItemList(PId)
                         select new PlanningFabricDetails
                         {
                             ColorID = p.ColorID,
                             Color = p.Color,
                             Size = p.Size,
                             SizeId = p.SizeID,
                             Prdn_Qty = (int)p.PrdnQty,
                             Weight = p.Weight,
                             Length = p.Length,
                             Width = p.Width,
                             Grammage = (int)p.Grammage,
                             Wmetres = p.WMetres,
                             SizeRow = (int)p.sizerow,
                             FinishWidthID = p.FinishWidthID,
                             GreyWidthID = p.GreyWidthID,
                             FinishWidth = p.FinishWidth,
                             GreyWidth = p.GreyWidth,
                             FabricID = p.FabricID,
                             Fabric = p.Fabric,
                             FabUomID = p.FabuomID,
                             FabricType = "K",
                             PlanID = PId,
                             CompSlNo = p.CompSlNo,
                             FPlanId = 0,
                             FGsm = "",
                             FColorID = p.ColorID,
                             Fcolor = p.Color,
                             snumb = (int)p.Snumb
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PlanningFabricDetails> GetConFabricPlantotList(int PId)
        {
            var query = (from Ecnp in entities.Proc_Apparel_GetPlanningFabricComDetEditTotItemList(PId)
                         select new PlanningFabricDetails
                         {

                             CompSlNo = Ecnp.CompSlNo,
                             ColorID = Ecnp.ColorID,
                             SizeId = Ecnp.SizeID,
                             Prdn_Qty = (int)Ecnp.PrdnQty,
                             Color = Ecnp.Color,
                             Size = Ecnp.Size,
                             Length = Ecnp.Length,
                             Width = Ecnp.Width,
                             Grammage = (int)Ecnp.Grammage,
                             Weight = Ecnp.Weight,
                             GreyWidth = Ecnp.GreyWidth,
                             GreyWidthID = (int)Ecnp.GreyWidthID,
                             FinishWidth = Ecnp.FinishWidth,
                             FinishWidthID = (int)Ecnp.FinishWidthID,
                             FPlanId = Ecnp.FPlanId,
                             PlanID = Ecnp.PlanID,
                             Woven_Req_InMtrs = (int)Ecnp.Wpm,
                             LossGain = (int)Ecnp.LossGain,
                             FabricID = (int)Ecnp.FabricID,
                             FabricType = Ecnp.Fabric_type,
                             BColorID = Ecnp.BaseColorID,
                             BColorPQty = (int)Ecnp.BColorPur_Qty,
                             FColorID = Ecnp.FinishColorID,
                             FColorPQty = (int)Ecnp.FColorPur_Qty,
                             PColorID = Ecnp.PrintColorId,
                             EntryDate = (DateTime)Ecnp.EntryDate,
                             KGsm = Ecnp.Knit_GSM == "" ? "" : Ecnp.Knit_GSM,
                             FGsm = Ecnp.Fin_GSM == "" ? "" : Ecnp.Fin_GSM,
                             snumb = (int)Ecnp.Snumb,
                             PiecePerBit = Ecnp.PiecePerBit,
                             BitSizeId = Ecnp.BitSizeId,
                             BitItemId = Ecnp.BitItemId
                            
                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<PlanningFabricDetails> GSizeList()
        {

            IQueryable<PlanningFabricDetails> query = (from o in entities.Proc_Apparel_GetMasterSizeGarmentLoad()
                                                       select new PlanningFabricDetails
                                                       {
                                                           SizeId = o.sizeid,
                                                           Size = o.size


                                                       }).AsQueryable();

            return query;
        }


        public IQueryable<PlanningFabricDetails> BitItemList()
        {

            IQueryable<PlanningFabricDetails> query = (from o in entities.Proc_Apparel_GetMasterComponentItemLoad()
                                                       select new PlanningFabricDetails
                                                       {
                                                           BitItemId = o.ItemId,
                                                           BitItem = o.Item


                                                       }).AsQueryable();

            return query;
        }

    }
}
