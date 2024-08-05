

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
using System.Net;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;


namespace AxonApparel.Repository
{
    public class PlanningConsumptionRepository : IPlanningConsumptionRepository
    {

        PlanningEntities entities = new PlanningEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

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
        public int ComSno = 0;
        public int YDPID = 0;
        public int YPMID = 0;
        public int YPDID = 0;

        public IQueryable<PlanningMain> GetDataPlanItemDetails(int ItemId, int StyleRowId)
        {


            IQueryable<PlanningMain> query = (from a in entities.Proc_Apparel_GetPlanningItemList(ItemId, StyleRowId)
                                              select new PlanningMain
                                              {
                                                  Order_No = a.OrderNo,
                                                  Ref_no = a.RefNo,
                                                  Style = a.Style,
                                                  StyleID = a.StyleId,
                                                  OrderQty = (int)a.Qty,
                                                  ProductionQty = (int)a.PQty,
                                                  buyer = a.Buyer,
                                                  Company = a.Company,
                                                  StyleRowid = StyleRowId,
                                                  Item = a.Item,
                                                  BMasID = a.BMasID,
                                                  ItemID = a.ItemId,
                                                  CompanyID = a.CompanyId,
                                                  buyerid = a.BuyerId,
                                                  EDate = (DateTime)a.Entry_Date,
                                                  Con_Plan = a.CPlan,
                                                  Fabric_Plan = a.FPlan,
                                                  Yarn_Plan = a.YPlan,
                                                  Acc_Plan = a.APlan,
                                                  Job_Ord_No = a.JobOrdNo,
                                                  Despatch_Closed=a.Despatch_Closed
                                              }).AsQueryable();

            return query;
        }
        public IList<PlanCompDetails> GetDataCompItemDetails(int ItemId, int StyleRowId, string GroupId, int ClNo)
        {




            var query = (from o in entities.Proc_Apparel_GetPlanningCompItemList(ItemId, StyleRowId, GroupId)
                         select new PlanCompDetails
                         {
                             Color = o.Color,
                             ColorID = o.ColorId,
                             Size = o.Size,
                             SizeId = o.SizeId,
                             Prdn_Qty = (int)o.PQty,
                             CompSlNo = ClNo,
                             CPlanSlNo = (Int16)o.SNo,
                             Con_PlanID = o.Con_PlanID,

                         }).AsQueryable();

            return query.ToList();
        }


        public bool AddDetConItemData(Planning_Mas objPmas, List<Comp_Plan_Mas> objPCMDet, List<Con_Plan> objPCDet, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, string PrgThr, string Mode, List<Yarn_Plan_Mas> objPMas, List<Yarn_Plan_Det> objPDDet, List<Yarn_Plan_ProLoss> objYPLDet, List<Yarn_Plan_Dyeing> objPDyet)
        {

            bool reserved = false;
            int PlId = 0;
            int OMasId = 0;
            string OrdNo = "";
            int StyRowId = 0;
            int YPalnDetId = 0;
            //int VPlanId = 0;

            int BomColorID = 0;
            decimal BomCorQty = 0;
            int BomSizeID = 0;
            int BomMasId = 0;
            int CBomColorId = 0;
            int CBomSizeid = 0;
            decimal CBomBaseQty = 0;

            int ProcessId = 0;
            int CProcessId = 0;
            decimal PlQty = 0;
            decimal CPlQty = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //Delete the Programm_Summary Table 

                    var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == objPmas.Order_No).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasId = OQuery.Buy_Ord_MasId;
                    }

                    //var result3 = entities.Proc_Apparel_DeleteConProgSum(OMasId, objPmas.CompanyID, objPmas.StyleID, objPmas.ItemID);
                    //entities.SaveChanges();

                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objPmas.Order_No && b.StyleID == objPmas.StyleID && b.CompanyID == objPmas.CompanyID && b.ItemID == objPmas.ItemID).FirstOrDefault();
                    if (OQueryP != null)
                    {
                        PlId = OQueryP.PlanID;
                        if (PlId > 0)
                        {
                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Con_Plan = "E";
                            }
                            entities.SaveChanges();
                        }
                    }
                    else
                    {
                        if (objPmas.PlanID == 0)
                        {
                            //var planmas = entities.Proc_Apparel_InsertConsumptionPlanMas(objPmas.CompanyID, objPmas.Buy_Ord_MasId, objPmas.Order_No, objPmas.StyleID, objPmas.ItemID, objPmas.CreatedBy);
                            //entities.SaveChanges();

                            //var POQuery = entities.Planning_Mas.Where(b => b.Order_No == objPmas.Order_No && b.StyleID == objPmas.StyleID && b.ItemID == objPmas.ItemID).FirstOrDefault();
                            //if (POQuery != null)
                            //{
                            //    PlId = POQuery.PlanID;
                            //}

                            entities.Planning_Mas.Add(objPmas);
                            entities.SaveChanges();
                            PlId = objPmas.PlanID;
                        }
                        else
                        {
                            PlId = objPmas.PlanID;
                        }
                    }
                    foreach (var item in objPCMDet)
                    {
                        item.PlanID = PlId;
                        var commas = entities.Proc_Apparel_InsertConsumptionCompMas(item.Entry_Date, item.CompSlNo, item.PlanID, item.ComponentID, item.No_Of_Parts, item.Fabric_Type, item.Grouping, item.Unit, item.Description, item.FabricID, item.GSM);
                        entities.SaveChanges();
                    }
                    entities.SaveChanges();

                    foreach (var item1 in objPCMDet)
                    {
                        if ((item1.Fabric_Type == "KNITS" || item1.Fabric_Type == "K") || (item1.Fabric_Type == "PANELS" || item1.Fabric_Type == "P"))
                        {
                            foreach (var value in objPCDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;

                                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objPmas.Order_No && b.Styleid == objPmas.StyleID).FirstOrDefault();
                                    if (GStyRId != null)
                                    {
                                        StyRowId = GStyRId.StyleRowid;
                                        OrdNo = GStyRId.order_no;
                                    }
                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgc = entities.Proc_Apparel_InsertConsumptionAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objPmas.Order_No, StyRowId, objPmas.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        var conplan = entities.Proc_Apparel_InsertConsumptionConPlan(value.CompSlNo, value.CPlanSlNo, value.PlanID, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.Weight, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objPmas.Order_No, StyRowId, objPmas.ItemID, value.ColorID, value.SizeId, value.ComponentID, value.Prdn_Qty, "NA");
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }
                        else if (item1.Fabric_Type == "WOVEN" || item1.Fabric_Type == "W")
                        {
                            foreach (var value in objPCDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;

                                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objPmas.Order_No && b.Styleid == objPmas.StyleID).FirstOrDefault();
                                    if (GStyRId != null)
                                    {
                                        StyRowId = GStyRId.StyleRowid;
                                        OrdNo = GStyRId.order_no;
                                    }
                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgc = entities.Proc_Apparel_InsertConsumptionWovenAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objPmas.Order_No, StyRowId, objPmas.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "W", "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        entities.Con_Plan.Add(value);
                                    }
                                }
                            }
                        }
                    }
                    entities.SaveChanges();
                    // For Insert Program Summary
                    int Pg = entities.Proc_Apparel_InsertConsumptionPrgSum(PlId);
                    entities.SaveChanges();
                    //Fabric Save
                    foreach (var item in objPDet)
                    {
                        item.PlanID = PlId;
                        // var PgYd = entities.Proc_Apparel_InsertConsumptionFabPlan(item.CompSlNo, item.PlanID, item.ColorID, item.SizeId, item.Prdn_Qty, item.Fabric_Req, item.Grammage, item.Woven_Req_InMtrs, item.LossGain, item.FabricId, item.Fabric_type, item.Fab_WidthId, item.Table_WidthID, item.BaseColorID, item.BColorPur_Qty, item.FinishColorID, item.FColorPur_Qty, item.PrintColorId, item.EntryDate, item.Knit_GSM, item.Fin_GSM, item.Loop_Len, item.Texture, item.Content, item.Gauge);
                        entities.Fabric_Plan.Add(item);
                        entities.SaveChanges();
                        FPID = item.FPlanId;
                        foreach (var itemL in objPLDet)
                        {
                            if (item.CompSlNo == itemL.CompSlNo && CProcessId != itemL.ProcessId)
                            {
                                itemL.FPlanId = FPID;
                                entities.Fab_Plan_ProLoss.Add(itemL);
                                ProcessId = itemL.ProcessId;
                            }
                            CProcessId = ProcessId;

                        }
                        //////////////////////
                        //For BaseFinColorPurchase
                        BCorQty = BCorQty + item.BColorPur_Qty;
                        FCorQty = FCorQty + (decimal)item.FColorPur_Qty;

                        // delete the bommas & bomdet table for fabric purchase
                        if ((BCorQty > 0) || (FCorQty > 0))
                        {
                            var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objPmas.Order_No) && (b.Styleid == objPmas.StyleID)).FirstOrDefault();
                            if (OQuery1 != null)
                            {
                                BomMasId = OQuery1.Buy_Ord_BOMid;
                            }
                            if (BomMasId == 0)
                            {
                                if ((BCorQty > 0) || (FCorQty > 0))
                                {
                                    var OrderNo = objPmas.Order_No;
                                    var StyleId = objPmas.StyleID;
                                    var CompId = objPmas.CompanyID;
                                    var Access_Type = "F";
                                    var Prog_Thru = "B";
                                    var PgF = entities.Proc_Apparel_GetPlanningFabricInsertFabBFPurQtyMas(OrderNo, StyleId, Access_Type, Prog_Thru, CompId);
                                    entities.SaveChanges();
                                }
                            }
                            var OQueryF = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objPmas.Order_No) && (b.Styleid == objPmas.StyleID)).FirstOrDefault();
                            if (OQueryF != null)
                            {
                                BomMasId = OQueryF.Buy_Ord_BOMid;

                            }
                            if (CBomColorId == item.BaseColorID && CBomSizeid == item.Table_WidthID)
                            {
                                if (item.BColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + item.BColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objPmas.CompanyID, objPmas.Order_No, objPmas.StyleID);
                                entities.SaveChanges();
                            }

                            else
                            {
                                if ((item.BColorPur_Qty > 0))
                                {
                                    BCorQty = item.BColorPur_Qty;
                                    if (BCorQty > 0)
                                    {
                                        BomColorID = item.BaseColorID;
                                        BomCorQty = item.BColorPur_Qty;
                                        BomSizeID = item.Table_WidthID;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objPmas.CompanyID, objPmas.Order_No, objPmas.StyleID);
                                    entities.SaveChanges();
                                }
                            }
                            CBomColorId = BomColorID;
                            CBomSizeid = BomSizeID;
                            CBomBaseQty = BomCorQty;
                            if (CBomColorId == item.FinishColorID && CBomSizeid == item.Fab_WidthId)
                            {
                                if (item.FColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + (decimal)item.FColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objPmas.CompanyID, objPmas.Order_No, objPmas.StyleID);
                                entities.SaveChanges();
                            }
                            else
                            {
                                if ((item.FColorPur_Qty > 0))
                                {
                                    FCorQty = (decimal)item.FColorPur_Qty;
                                    if (FCorQty > 0)
                                    {
                                        BomColorID = item.FinishColorID;
                                        BomCorQty = (decimal)item.FColorPur_Qty;
                                        BomSizeID = item.Fab_WidthId;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objPmas.CompanyID, objPmas.Order_No, objPmas.StyleID);
                                    entities.SaveChanges();
                                }
                            }
                            CBomColorId = BomColorID;
                            CBomBaseQty = BomCorQty;
                            CBomSizeid = BomSizeID;
                        }
                    }
                    //Insert into PrgSum
                    var Pg3 = entities.sp_ProgSum_Fabric1(objPmas.Order_No, objPmas.CompanyID, PrgThr, objPmas.StyleID, PlId, Mode);
                    entities.SaveChanges();
                    //Update into Cost and Plan
                    var Pg4 = entities.Proc_Apparel_GetPlanFabricCostUpdate(objPmas.Order_No, objPmas.StyleID, PlId);
                    entities.SaveChanges();
                    //Yarn modify save
                    foreach (var item in objPMas)
                    {
                        if (item.YPlanmasID == 0)
                        {
                            item.PlanId = PlId;
                            //var yp = entities.Proc_Apparel_InsertConsumptionYarnPlan(item.PlanId, item.FabricID, item.Fabric_ColorId, item.Fabric_Weight, item.Fabric_type, item.EntryDate, item.SlNo, item.ComponentID, item.CompSlNo);
                            entities.Yarn_Plan_Mas.Add(item);
                            entities.SaveChanges();
                            YPID = item.YPlanmasID;
                            //var OQueryyF = entities.Yarn_Plan_Mas.Where(b => b.PlanId == PlId && b.CompSlNo == item.CompSlNo && b.SlNo == item.SlNo && b.ComponentID == item.ComponentID && b.FabricID == item.FabricID).FirstOrDefault();
                            //if (OQueryyF != null)
                            //{
                            //    YPID = OQueryyF.YPlanmasID;
                            //}
                        }
                        //detItem.SlNo =ComponentSerial No ,detItem.YSNo=Yarnpalnmasserial No 
                        foreach (var detItem in objPDDet)
                        {
                            ComSno = detItem.SlNo;
                            if (ComSno == item.CompSlNo && detItem.YSNo == item.SlNo)
                            {
                                detItem.YPlanMasID = YPID;
                                detItem.FabricID = item.FabricID;
                                //var PgYd = entities.Proc_Apparel_InsertConsumptionYarnPlanDet(detItem.YPlanMasID, detItem.Knit_In_ItemId, detItem.Knit_In_SizeID, detItem.Knit_in_ColorID, detItem.Knit_In_Per, detItem.Knit_In_Qty, detItem.Loss_per, detItem.Dyeing_Req, detItem.SlNo, detItem.YSNo, detItem.FabricID, detItem.Fabric_ColorId, detItem.YDSlno);
                                entities.Yarn_Plan_Det.Add(detItem);
                                entities.SaveChanges();
                                YDPID = detItem.YPlanDetID;
                                foreach (var itemL in objYPLDet)
                                {
                                    if (detItem.YSNo == itemL.FSNo && itemL.CompSNo == detItem.SlNo)
                                    {
                                        itemL.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_ProLoss.Add(itemL);
                                    }
                                }
                                foreach (var itemDy in objPDyet)
                                {
                                    if (detItem.YDSlno == itemDy.YSNo && detItem.SlNo == itemDy.CompSlNo && detItem.Dyeing_Req == true)
                                    {
                                        itemDy.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_Dyeing.Add(itemDy);
                                    }
                                }
                                entities.SaveChanges();
                            }
                        }
                    }
                    // Insert into PrgSum
                    var Pgy = entities.Proc_Apparel_GetPlanInsertYarnDetails(objPmas.Order_No, objPmas.StyleID);
                    entities.SaveChanges();
                    ////Insert into BomDet
                    var Pgy1 = entities.proc_Yarn_BOMUpdation(objPmas.CompanyID, objPmas.Order_No, objPmas.StyleID);
                    entities.SaveChanges();
                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PlId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "E";
                    }

                    //var res = AmendData(objPmas, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Add", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                    //
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PlanningConsumption-AddDetConItemData");
                }

            }
            return reserved;


        }
        public IList<PlanComponent> GetRepCompDetList(int itemId, int StyleRowId, int PlanID)
        {

            var query = (from Ec in entities.Proc_Apparel_GetPlanningEditComItemList(itemId, StyleRowId, PlanID)
                         select new PlanComponent
                         {
                             CompSlNo = Ec.CompSlNo,
                             PlanID = Ec.PlanID,
                             ComponentID = Ec.CompId,
                             ComponentName = Ec.Component,
                             No_Of_Parts = Ec.No_Of_Parts,
                             Fabric_TypeID = Ec.Fabric_Type,
                             Fabric_Type = Ec.Fabric_Type,
                             GroupingID = Ec.CompGroupId.Trim(),//Ec.CompGroupId,
                             Grouping = Ec.GroupType,
                             Unit = Ec.Unit,
                             Description = Ec.Descrp,
                             FabricID = Ec.FabricId,
                             FabricName = Ec.Fabric,
                             Comp_Plan_MasID = Ec.Comp_Plan_MasID,
                             Entry_Date = Ec.Entry_Date,
                             GSM = Ec.GSM,
                             CheckDcMade = Ec.CheckDcMade
                         }).AsQueryable();

            return query.ToList();



        }
        public IList<PlanCompDetails> GetRepConDetList(int itemId, int StyleRowId, int CompSNo, int PlanID)
        {

            var query = (from Ecn in entities.Proc_Apparel_GetPlanningEditConItemList(itemId, StyleRowId, CompSNo, PlanID)
                         select new PlanCompDetails
                         {
                             CompSlNo = Ecn.CompSlNo,
                             CPlanSlNo = (Int16)Ecn.CPlanSlNo,
                             ColorID = Ecn.colorId,
                             SizeId = Ecn.SizeId,
                             Prdn_Qty = Ecn.PQty,
                             Color = Ecn.Color,
                             Size = Ecn.Size,
                             Length = Ecn.Len,
                             Width = Ecn.Width,
                             GSM = Ecn.Gsm,
                             Grammage = Ecn.Gram,
                             Weight = Ecn.Weight,
                             GreyWidth = Ecn.GWidth,
                             GreyWidthID = Ecn.GWidthId,
                             FinishWidth = Ecn.FWidth,
                             FinishWidthID = Ecn.FWidthId,
                             Con_PlanID = Ecn.Con_PlanID,

                         }).AsQueryable();

            return query.ToList();



        }

        public bool UpdateConDetData(Planning_Mas objCAd, List<Comp_Plan_Mas> objPCMDet, List<Con_Plan> objPCDet, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, string PrgThr, string Mode, List<Yarn_Plan_Mas> objPMas, List<Yarn_Plan_Det> objPDDet, List<Yarn_Plan_ProLoss> objYPLDet, List<Yarn_Plan_Dyeing> objPDyet)
        {

            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var Pt = "W";
            var styId = 0;
            var PId = 0;
            var EMode = "D";
            int StyRowId = 0;
            var FType = "";
            int PlId = 0;
            int BomColorID = 0;
            decimal BomCorQty = 0;
            int BomSizeID = 0;
            int BomMasId = 0;
            int CBomColorId = 0;
            int CBomSizeid = 0;
            decimal CBomBaseQty = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //Delete Yarndet
                    var Pg4 = entities.Proc_Apparel_DeleteConsumptionYarnDetails(objCAd.PlanID);
                    entities.SaveChanges();
                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objCAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }
                    //  Insert into PrgSum
                    var Pg = entities.Sp_ProgSum_Yarn(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();
                    //Delete Fabdet
                    var Pgf = entities.Proc_Apparel_DeleteConsumptionFabDetails(objCAd.PlanID);
                    entities.SaveChanges();
                    //delete the programm summary table        
                    var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();
                    //Delete the Programm_Summary Table                    
                    //var resultCon = entities.Proc_Apparel_DeleteConProgSum(OmasId, objCAd.CompanyID, objCAd.StyleID, objCAd.ItemID);
                    //entities.SaveChanges();
                    //
                    //Delete conplan
                    var Pgc = entities.Proc_Apparel_DeleteConsumptionConDetails(objCAd.PlanID);
                    entities.SaveChanges();
                    //
                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objCAd.Order_No && b.StyleID == objCAd.StyleID && b.CompanyID == objCAd.CompanyID).FirstOrDefault();
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
                        if (objCAd.PlanID == 0)
                        {
                            objCAd.ModifyBy = objCAd.CreatedBy;
                            objCAd.Modify_Date = DateTime.Now;
                            var id = entities.Planning_Mas.Add(objCAd);
                            entities.SaveChanges();
                            PlId = objCAd.PlanID;
                        }
                        else
                        {
                            objCAd.ModifyBy = objCAd.CreatedBy;
                            objCAd.Modify_Date = DateTime.Now;
                            PlId = objCAd.PlanID;
                        }
                    }

                    entities.SaveChanges();
                    ////////////Edit Case For ALL
                    //Delete the Programm_Summary Table     
                    //var resultC = entities.Proc_Apparel_DeleteConProgSum(OmasId, objCAd.CompanyID, objCAd.StyleID, objCAd.ItemID);
                    //entities.SaveChanges();

                    //Check the Planning Entry Made
                    var EOQueryP = entities.Planning_Mas.Where(b => b.Order_No == objCAd.Order_No && b.StyleID == objCAd.StyleID && b.CompanyID == objCAd.CompanyID && b.ItemID == objCAd.ItemID).FirstOrDefault();
                    if (EOQueryP != null)
                    {
                        PlId = EOQueryP.PlanID;
                        if (PlId > 0)
                        {
                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Con_Plan = "E";
                                AppMas.Fabric_Plan = "E";
                                AppMas.Yarn_Plan = "E";
                            }
                            entities.SaveChanges();
                        }
                    }
                    else
                    {
                        if (objCAd.PlanID == 0)
                        {
                            objCAd.ModifyBy = objCAd.CreatedBy;
                            objCAd.Modify_Date = DateTime.Now;
                            var id = entities.Planning_Mas.Add(objCAd);
                            entities.SaveChanges();
                            PlId = objCAd.PlanID;
                        }
                        else
                        {
                            objCAd.ModifyBy = objCAd.CreatedBy;
                            objCAd.Modify_Date = DateTime.Now;
                            PlId = objCAd.PlanID;
                        }
                    }
                    foreach (var item in objPCMDet)
                    {
                        item.PlanID = PlId;
                        entities.Comp_Plan_Mas.Add(item);
                    }
                    entities.SaveChanges();
                    foreach (var item1 in objPCMDet)
                    {
                        if ((item1.Fabric_Type == "KNITS" || item1.Fabric_Type == "K") || (item1.Fabric_Type == "PANELS" || item1.Fabric_Type == "P"))
                        {
                            foreach (var value in objPCDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;
                                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objCAd.Order_No && b.Styleid == objCAd.StyleID).FirstOrDefault();
                                    if (GStyRId != null)
                                    {
                                        StyRowId = GStyRId.StyleRowid;
                                        OrdNo = GStyRId.order_no;
                                    }
                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgcv = entities.Proc_Apparel_InsertConsumptionAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objCAd.Order_No, StyRowId, objCAd.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        entities.Con_Plan.Add(value);
                                    }
                                }
                            }
                        }
                        else if (item1.Fabric_Type == "WOVEN" || item1.Fabric_Type == "W")
                        {
                            foreach (var value in objPCDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;
                                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objCAd.Order_No && b.Styleid == objCAd.StyleID).FirstOrDefault();
                                    if (GStyRId != null)
                                    {
                                        StyRowId = GStyRId.StyleRowid;
                                        OrdNo = GStyRId.order_no;
                                    }
                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgwv = entities.Proc_Apparel_InsertConsumptionWovenAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objCAd.Order_No, StyRowId, objCAd.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "W", "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        entities.Con_Plan.Add(value);
                                    }
                                }
                            }
                        }
                    }
                    entities.SaveChanges();
                    // For Insert Program Summary
                    int PgS = entities.Proc_Apparel_InsertConsumptionPrgSum(PlId);
                    entities.SaveChanges();
                    //Fabric Save
                    foreach (var item in objPDet)
                    {
                        item.PlanID = PlId;
                        if (item.Fabric_type == "KNITS")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "K")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "PANELS")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "P")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "WOVEN")
                        {
                            FType = "W";
                        }
                        else if (item.Fabric_type == "W")
                        {
                            FType = "W";
                        }

                        item.Fabric_type = FType;
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
                        BCorQty = BCorQty + item.BColorPur_Qty;
                        FCorQty = FCorQty + (decimal)item.FColorPur_Qty;
                        ////////////////////////
                        if ((BCorQty > 0) || (FCorQty > 0))
                        {
                            var OQueryB = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objCAd.Order_No) && (b.Styleid == objCAd.StyleID)).FirstOrDefault();
                            if (OQueryB != null)
                            {
                                BomMasId = OQueryB.Buy_Ord_BOMid;
                            }
                            if (BomMasId == 0)
                            {
                                if ((BCorQty > 0) || (FCorQty > 0))
                                {
                                    var OrderNo = objCAd.Order_No;
                                    var StyleId = objCAd.StyleID;
                                    var CompId = objCAd.CompanyID;
                                    var Access_Type = "F";
                                    var Prog_Thru = "B";
                                    var PgF = entities.Proc_Apparel_GetPlanningFabricInsertFabBFPurQtyMas(OrderNo, StyleId, Access_Type, Prog_Thru, CompId);
                                    entities.SaveChanges();
                                }
                            }
                            var OQueryF = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objCAd.Order_No) && (b.Styleid == objCAd.StyleID)).FirstOrDefault();
                            if (OQueryF != null)
                            {
                                BomMasId = OQueryF.Buy_Ord_BOMid;
                            }
                            if (CBomColorId == item.BaseColorID && CBomSizeid == item.Table_WidthID)
                            {
                                if (item.BColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + item.BColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objCAd.CompanyID, objCAd.Order_No, objCAd.StyleID);
                                entities.SaveChanges();
                            }
                            else
                            {
                                if ((item.BColorPur_Qty > 0))
                                {
                                    BCorQty = item.BColorPur_Qty;
                                    if (BCorQty > 0)
                                    {
                                        BomColorID = item.BaseColorID;
                                        BomCorQty = item.BColorPur_Qty;
                                        BomSizeID = item.Table_WidthID;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objCAd.CompanyID, objCAd.Order_No, objCAd.StyleID);
                                    entities.SaveChanges();
                                }
                            }
                            CBomColorId = BomColorID;
                            CBomSizeid = BomSizeID;
                            CBomBaseQty = BomCorQty;
                            if (CBomColorId == item.FinishColorID && CBomSizeid == item.Fab_WidthId)
                            {
                                if (item.FColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + (decimal)item.FColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objCAd.CompanyID, objCAd.Order_No, objCAd.StyleID);
                                entities.SaveChanges();
                            }
                            else
                            {
                                if ((item.FColorPur_Qty > 0))
                                {
                                    FCorQty = (decimal)item.FColorPur_Qty;
                                    if (FCorQty > 0)
                                    {
                                        BomColorID = item.FinishColorID;
                                        BomCorQty = (decimal)item.FColorPur_Qty;
                                        BomSizeID = item.Fab_WidthId;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objCAd.CompanyID, objCAd.Order_No, objCAd.StyleID);
                                    entities.SaveChanges();

                                }
                            }
                            CBomColorId = BomColorID;
                            CBomBaseQty = BomCorQty;
                            CBomSizeid = BomSizeID;
                        }

                    }
                    //Insert into PrgSum
                    var Pg3 = entities.sp_ProgSum_Fabric1(objCAd.Order_No, objCAd.CompanyID, PrgThr, objCAd.StyleID, PlId, Mode);
                    entities.SaveChanges();

                    //Yarn Save                    
                    foreach (var item in objPMas)
                    {
                        if (item.Fabric_type == "KNITS")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "K")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "PANELS")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "P")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "WOVEN")
                        {
                            FType = "W";
                        }
                        else if (item.Fabric_type == "W")
                        {
                            FType = "W";
                        }
                        item.Fabric_type = FType;
                        item.PlanId = PlId;
                        entities.Yarn_Plan_Mas.Add(item);
                        entities.SaveChanges();
                        YPID = item.YPlanmasID;
                        foreach (var detItem in objPDDet)
                        {
                            ComSno = detItem.SlNo;
                            if (ComSno == item.CompSlNo && detItem.YSNo == item.SlNo)
                            {
                                detItem.YPlanMasID = YPID;
                                detItem.FabricID = item.FabricID;
                                entities.Yarn_Plan_Det.Add(detItem);
                                entities.SaveChanges();
                                YDPID = detItem.YPlanDetID;
                                foreach (var itemL in objYPLDet)
                                {
                                    if (detItem.YSNo == itemL.FSNo && itemL.CompSNo == detItem.SlNo)
                                    {
                                        itemL.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_ProLoss.Add(itemL);
                                    }
                                }
                                foreach (var itemDy in objPDyet)
                                {
                                    if (detItem.YDSlno == itemDy.YSNo && detItem.SlNo == itemDy.CompSlNo && detItem.Dyeing_Req == true)
                                    {
                                        itemDy.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_Dyeing.Add(itemDy);
                                    }
                                }
                            }
                            entities.SaveChanges();
                        }
                    }
                    //
                    var Pgy = entities.Proc_Apparel_GetPlanInsertYarnDetails(objCAd.Order_No, objCAd.StyleID);
                    entities.SaveChanges();
                    ////Insert into BomDet
                    var Pgy1 = entities.proc_Yarn_BOMUpdation(objCAd.CompanyID, objCAd.Order_No, objCAd.StyleID);
                    entities.SaveChanges();
                    //Update  into Cost and Plan
                    var Pgcost = entities.Proc_Apparel_GetPlanFabricCostUpdate(objCAd.Order_No, objCAd.StyleID, PlId);
                    entities.SaveChanges();
                    //Delete into BuyOrdDet
                    var Pg5 = entities.Proc_Apparel_GetPlanFabricDeleteBomUpdate(objCAd.Order_No, objCAd.StyleID, PlId);
                    entities.SaveChanges();

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PlId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "E";
                    }
                    //var res = AmendData(objCAd, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Upd", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
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


        public IList<PlanCompDetails> GetRepConDetTotList(int itemId, int StyleRowId, int PlanID)
        {
            var query = (from Ecn in entities.Proc_Apparel_GetPlanningEditContotItemList(itemId, StyleRowId, PlanID)
                         select new PlanCompDetails
                         {

                             CompSlNo = (int)Ecn.CompSlNo,
                             CPlanSlNo = (int)Ecn.CPlanSlNo,
                             ColorID = Ecn.colorId,
                             SizeId = Ecn.SizeId,
                             Prdn_Qty = (decimal)Ecn.PQty,
                             Color = Ecn.Color,
                             Size = Ecn.Size,
                             Length = Ecn.Len,
                             Width = Ecn.Width,
                             GSM = Ecn.Gsm,
                             Grammage = Ecn.Gram,
                             Weight = (decimal)Ecn.Weight,
                             GreyWidth = Ecn.GWidth,
                             GreyWidthID = Ecn.GWidthId,
                             FinishWidth = Ecn.FWidth,
                             FinishWidthID = Ecn.FWidthId,
                             Con_PlanID = Ecn.Con_PlanID,
                             Requirement = Ecn.Len,
                             WtMetre = Ecn.Gsm,
                             TotMetres = (decimal)Ecn.Wmeter,
                             No_Of_Parts = Ecn.Parts,
                             type = Ecn.FabType,
                             GmsPieces = Ecn.Gram,
                             TotPieces = (decimal)Ecn.PQty * Ecn.Parts,
                             AlloLen = (decimal)Ecn.LengthAllow,
                             AllowWid = (decimal)Ecn.WidthAllow,
                             Pattern = (decimal)Ecn.Pattern,
                             CheckDcMade = Ecn.CheckDcMade,
                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<PlanCompDetails> Getfabricdet()
        {
            IQueryable<PlanCompDetails> query = (from a in entities.Proc_Apparel_Fabric()
                                                 select new PlanCompDetails
                                                     {
                                                         SizeId = a.SizeId,
                                                         Size = a.size

                                                     }).AsQueryable();

            return query;
        }


        public IList<PlanningFabricDetails> GetCompFabricPlanList(int Itemid, int StyleRowId, int CompSNo)
        {
            var query = (from p in entities.Proc_Apparel_GetPlanningCompFabItemList(Itemid, StyleRowId)
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
                             PlanID = 0,
                             CompSlNo = CompSNo,
                             FPlanId = 0,
                             FGsm = "",
                             FColorID = p.ColorID,
                             Fcolor = p.Color,
                             snumb = (int)p.Snumb,
                             guage = "",
                             texture = "",
                             KGsm = "",
                             LoopLen = "",
                             content = ""
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
                             //Weight = Ecnp.ActWeight,
                             //ActWeight = Ecnp.Weight,

                             // Weight = Ecnp.Fabric_type=="K"? Ecnp.Weight:Ecnp.WMetres,
                             //ActWeight = Ecnp.Fabric_type == "K" ? Ecnp.Weight : Ecnp.WMetres,

                             Weight = Ecnp.Fabric_type == "K" ? Ecnp.ActWeight : Ecnp.Fabric_type == "W" ? Ecnp.WMetres : Ecnp.ActWeight,
                             ActWeight = Ecnp.Fabric_type == "K" ? Ecnp.Weight : Ecnp.Fabric_type == "W" ? Ecnp.WMetres : Ecnp.Weight,
                             GreyWidth = Ecnp.GreyWidth,
                             GreyWidthID = (int)Ecnp.GreyWidthID,
                             FinishWidth = Ecnp.FinishWidth,
                             FinishWidthID = (int)Ecnp.FinishWidthID,
                             FPlanId = Ecnp.FPlanId,
                             PlanID = Ecnp.PlanID,
                             Woven_Req_InMtrs = Ecnp.Fabric_type == "P" ?Ecnp.Woven_Req_InMtrs:Ecnp.Weight,
                             LossGain = (int)Ecnp.LossGain,
                             FabricID = (int)Ecnp.FabricID,
                             Fabric = Ecnp.Fabric,
                             FabricType = Ecnp.Fabric_type,
                             BColorID = Ecnp.BaseColorID,
                             BColorPQty = (decimal)Ecnp.BColorPur_Qty,
                             FColorID = Ecnp.FinishColorID,
                             FColorPQty = (decimal)Ecnp.FColorPur_Qty,
                             PColorID = Ecnp.PrintColorId,
                             EntryDate = (DateTime)Ecnp.EntryDate,
                             KGsm = Ecnp.Knit_GSM == "" ? "" : Ecnp.Knit_GSM,
                             FGsm = Ecnp.Fin_GSM == "" ? "" : Ecnp.Fin_GSM,
                             snumb = (int)Ecnp.Snumb,
                             guage = Ecnp.Gauge == "" ? "" : Ecnp.Gauge,
                             texture = Ecnp.Texture == "" ? "" : Ecnp.Texture,
                             LoopLen = Ecnp.Loop_Len == "" ? "" : Ecnp.Loop_Len,
                             content = Ecnp.Content == "" ? "" : Ecnp.Content,
                             CheckDcMade = Ecnp.CheckDcMade,
                             PiecePerBit = Ecnp.PiecePerBit,
                             BitSizeId = Ecnp.BitSizeId,
                             BitItemId = Ecnp.BitItemId,
                             TotalBit = 0,
                         }).AsQueryable();

            return query.ToList();
        }
        public IList<PlanningYarn> GetFabricItemDetails(int PId)
        {


            var query = (from Y in entities.Proc_GetFabricDetailsForYarn(PId)
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
                             YSlno = (int)Y.SlNo,
                             SlNo = Y.CompSlNo,
                             Component = Y.Component,
                             ComponentId = Y.ComponentId,
                         }).AsQueryable();

            return query.ToList();
        }

        //Edit Yarn Det 

        public IList<PlanningYarnDet> GetEditYarnDetDetails(int PId)
        {
            var query = (from Ed in entities.Proc_Apparel_GetPlanningYarnEditDetItemList(PId)
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
                             Knit_In_Per = (decimal)Ed.Knit_In_Per,
                             Knit_In_Qty = (decimal)Ed.Knit_In_Qty,
                             Knit_In_ActQty = (decimal)Ed.Knit_In_Qty,
                             Loss_per = Ed.Loss_per,
                             Dyeing_Req = Ed.Dyeing_Req,
                             YSlNo = Ed.YSlNo,
                             SlNo = (int)Ed.SlNo,
                             FabricID = Ed.FabricID,
                             BaseColorID = Ed.Fabric_ColorId,
                             CompSno = Ed.CompSlNo,
                             OrdQty = Ed.Order_Qty,
                             stockTrans=0,
                         }).AsQueryable();

            return query.ToList();
        }


        public IList<Bom> GetDataRepCheckPoDetails(string OrdNo, int StyId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPoYarnChkDetails(OrdNo, StyId)
                         select new Bom
                         {
                             PoNo = YD1.pur_ord_no,
                             PurOrdId = YD1.pur_ord_id,


                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PlanningYarnDyeing> GetDyeingItemDetails(int StyleRowId, int ItemId, int BColorId, int FabricId, int CompId, int YDSlNo)
        {
            var query = (from YD in entities.Proc_Apparel_GetYarnPlanningDyeDetails(StyleRowId)
                         select new PlanningYarnDyeing
                         {
                             GColor = YD.GColor,
                             Garment_ColorID = YD.GColorID,
                             CColorID = YD.CColorID,
                             CColor = YD.CColor,
                             Weight = 0,//(decimal)Qty,
                             GWeight = (decimal)YD.GWeight,//YD.GWeight,
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


        public IList<PlanLoss> GetCompDetFabricLossDetails(int PId, int ComSNo)
        {

            int Fplanid = 0;
            int CompSNo = 0;
            var query = (from Lp in entities.Proc_Apparel_GetPlanningFabricLossItemList(PId, CompSNo, Fplanid)
                         select new PlanLoss
                         {
                             CompSNo = Lp.CompSlNo,
                             Loss_Per = Lp.Loss_Per,
                             SlNo = Lp.SlNo,
                             ProcessId = Lp.ProcessId,
                             ProcessName = Lp.Process,
                             FPlanId = 0,
                             FLPlanID = 0,
                             FLGColorID = Lp.GColorId,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PlanningYarnDyeing> GetYarnDyeingRepList(int PId, int IteID, int FabID, int StRowID)
        {

            var query = (from Ecnd in entities.Proc_GetFabricYarnDyeingEditDetails(PId, IteID, FabID, StRowID)
                         select new PlanningYarnDyeing
                         {


                             GColor = Ecnd.GColor,
                             Garment_ColorID = (int)Ecnd.GColorID,
                             CColorID = Ecnd.CColorID,
                             CColor = Ecnd.CColor,
                             Weight = Ecnd.PerWeight,
                             GWeight = Ecnd.GWeight,
                             ActWeight = Ecnd.GWeight,
                             Yarn_DyeColorID = Ecnd.YDID,
                             Qty_Per = Ecnd.QPer,
                             Purchase_Qty = Ecnd.PQty,
                             Loss = Ecnd.Loss,
                             ColorSeq = (int)Ecnd.Composition_Seq,
                             PerWeight = Ecnd.PerWeight,
                             YPlanDetID = Ecnd.YPlanDetID,
                             YPlanDyeID = Ecnd.YPlanDyeID,
                             YDSlNo = (int)Ecnd.EYDetSlNo,
                             SlNo = (int)Ecnd.EYDSlNo,
                             YPlanMasID = Ecnd.YPlanMasID,
                             CompSlNo = Ecnd.CompSNo,



                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PlanningYarnLoss> GetCompDetYarnLossDetails(int PId)
        {
            var query = (from Lp1 in entities.Proc_Apparel_GetPlanningYarnLossItemList(PId)
                         select new PlanningYarnLoss
                         {
                             SNo = Lp1.YDetSlno,
                             Loss_Per = Lp1.Loss_Per,
                             SlNo = Lp1.SlNo,
                             CompSNo = Lp1.ComplNo,
                             ProcessId = Lp1.ProcessId,
                             ProcessName = Lp1.Process,
                             YPlanDetID = Lp1.YPlanDetID,
                             YPlanLossID = Lp1.YPlanLossID,

                         }).AsQueryable();

            return query.ToList();
        }


        public IList<ProdPrgMas> GetDataRepCheckPrgDetails(int StyRowId)
        {
            var query = (from Prg in entities.Proc_Apparel_GetPrgChkDetails(StyRowId)
                         select new ProdPrgMas
                         {
                             ProdPrgNo = Prg.PrgNo,
                             ProdPrgid = Prg.PrgId,


                         }).AsQueryable();

            return query.ToList();
        }


        public IQueryable<PlanningMain> GetStyleNo(string orderno)
        {
            var query = (from a in entities.Proc_Apparel_GetPlanningStyleNumber(orderno)
                         select new Domain.PlanningMain
                         {
                             StyleID = a.Styleid,
                             Style = a.Style,
                             Order_No = a.order_no,
                             PlanID = a.PlanID,
                             StyleRowid = a.StyleRowid,
                             ItemID = a.ItemID,
                             Item = a.Item,
                             Ref_no = a.ref_no,
                             Quantity = (decimal)a.PQty,
                         }).AsQueryable();

            return query;
        }



        public IQueryable<PlanningMain> FabRequirementRpt(int compid, int buyerid, string ordno, int styleid, string fromdate, string todate)
        {

            var query = (from o in entities.Proc_Apparel_FabRequirementReport(compid, buyerid, ordno, styleid, fromdate, todate)
                         select new PlanningMain
                         {
                             Order_No = o.Order_No,
                             Style = o.Style,
                             StyleID = o.StyleID,
                             CompanyID = (int)o.companyid,
                             PlanID = o.PlanID,
                             BMasID = o.Buy_Ord_MasId,
                             Order_date = (DateTime)o.Order_Date,
                             buyer = o.buyer,
                             Quantity = (decimal)o.Quantity,
                             Ref_no = o.Ref_No

                         }).AsQueryable();

            return query;
        }


        public IQueryable<PlanningMain> PlanningRpt(int compid, int buyerid, string ordno, int styleid, string ordtype, string buyrefno, string itmtype, string DtType, string fromdate, string todate)
        {
            var query = (from o in entities.Proc_Apparel_PlanningStmntReport(compid, buyerid, ordno, styleid, ordtype, buyrefno, itmtype, DtType, fromdate, todate)
                         select new PlanningMain
                         {
                             Order_No = o.Order_No,
                             Style = o.style,
                             StyleID = o.Styleid,
                             CompanyID = (int)o.CompanyID,
                             StyleRowid = o.styleRowID,

                             Order_date = (DateTime)o.Order_Date,
                             buyer = o.buyer,

                             Ref_no = o.Ref_No

                         }).AsQueryable();

            return query;
        }


        public IQueryable<PlanningMain> DetailCostingRpt(int compid, int buyerid, int seasonid, int itmgrpid, string ordno, int styleid, string ordtype, string refno, string wrkord, string itmtype, string fromdate, string todate)
        {
            var query = (from o in entities.Proc_Apparel_DetailCostingStmntReport(compid, buyerid, seasonid, itmgrpid, ordno, styleid, ordtype, refno, wrkord, itmtype, fromdate, todate)
                         select new PlanningMain
                         {
                             Order_No = o.Order_No,
                             Style = o.style,
                             StyleID = o.styleid,
                             BMasID = o.Buy_Ord_MasId,
                             buyer = o.Buyer,
                             Ref_no = o.Ref_No

                         }).AsQueryable();

            return query;
        }


        public bool AmendData(Planning_Mas objPmas, List<Comp_Plan_Mas> objPCMDet, List<Con_Plan> objPCDet, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet, string PrgThr, string Mode, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet)
        {
            bool reserved = false;
            int AmPlId = 0;
            int OMasId = 0;
            string OrdNo = "";
            int StyRowId = 0;
            int YPalnDetId = 0;
            //int VPlanId = 0;

            int BomColorID = 0;
            decimal BomCorQty = 0;
            int BomSizeID = 0;
            int BomMasId = 0;
            int CBomColorId = 0;
            int CBomSizeid = 0;
            decimal CBomBaseQty = 0;

            int ProcessId = 0;
            int CProcessId = 0;
            decimal PlQty = 0;
            decimal CPlQty = 0;
            try
            {
                //Check the Planning Entry Made



                Repository.Planning_Mas_Amend masamd = new Repository.Planning_Mas_Amend();
                if (objPmas != null)
                {

                    masamd.PlanID = objPmas.PlanID;
                    masamd.CompanyID = objPmas.CompanyID;
                    masamd.Buy_Ord_MasId = objPmas.Buy_Ord_MasId;
                    masamd.Order_No = objPmas.Order_No;
                    masamd.StyleID = objPmas.StyleID;
                    masamd.ItemID = objPmas.ItemID;
                    masamd.Con_Plan = objPmas.Con_Plan;
                    masamd.Fabric_Plan = objPmas.Fabric_Plan;
                    masamd.Yarn_Plan = objPmas.Yarn_Plan;
                    masamd.Acc_Plan = objPmas.Acc_Plan;
                    masamd.Pack_Plan = objPmas.Pack_Plan;
                    masamd.Fab_plan_Remarks = objPmas.Fab_plan_Remarks;
                    masamd.CreatedBy = objPmas.CreatedBy;
                    masamd.IsApproved = objPmas.IsApproved;
                    masamd.LockPlanning = objPmas.LockPlanning;
                    masamd.LockCon = objPmas.LockCon;
                    masamd.LockFab = objPmas.LockFab;
                    masamd.LockYarn = objPmas.LockYarn;
                    masamd.LockAccs = objPmas.LockAccs;
                    masamd.LockPack = objPmas.LockPack;
                    masamd.PA = objPmas.PA;
                }

                var id = entities.Planning_Mas_Amend.Add(masamd);
                entities.SaveChanges();
                AmPlId = masamd.PlanAmndId;


                entities.SaveChanges();
                var List = new List<Repository.Comp_Plan_Mas_Amend>();
                foreach (var ad in objPCMDet)
                {
                    List.Add(new Repository.Comp_Plan_Mas_Amend
                    {
                        Comp_Plan_MasAmndId = ad.Comp_Plan_MasID,
                        Comp_Plan_MasID = ad.Comp_Plan_MasID,
                        Entry_Date = ad.Entry_Date,
                        CompSlNo = ad.CompSlNo,
                        PlanID = AmPlId,
                        ComponentID = ad.ComponentID,
                        No_Of_Parts = ad.No_Of_Parts,
                        Fabric_Type = ad.Fabric_Type,
                        Grouping = ad.Grouping,
                        Unit = ad.Unit,
                        Description = ad.Description,
                        FabricID = ad.FabricID,
                        GSM = ad.GSM
                    });
                }

                foreach (var item in List)
                {
                    if (Mode == "Add")
                    {
                        item.Entry_Date = item.Entry_Date;
                    }
                    else if (Mode == "Upd")
                    {
                        item.Entry_Date = DateTime.Now;
                    }

                    entities.Comp_Plan_Mas_Amend.Add(item);

                }
                entities.SaveChanges();

                var ConList = new List<Repository.Con_Plan_Amend>();
                foreach (var adc in objPCDet)
                {
                    ConList.Add(new Repository.Con_Plan_Amend
                    {
                        Con_PlanID = adc.Con_PlanID,
                        CompSlNo = adc.CompSlNo,
                        CPlanSlNo = adc.CPlanSlNo,
                        PlanID = AmPlId,
                        ColorID = adc.ColorID,
                        SizeId = adc.SizeId,
                        Prdn_Qty = adc.Prdn_Qty,
                        Length = adc.Length,
                        Width = adc.Width,
                        GSM = adc.GSM,
                        Grammage = adc.Grammage,
                        Weight = adc.Weight,
                        Wmetres = adc.Wmetres,
                        ActualFabricWidth = adc.ActualFabricWidth,
                        GreyWidthID = adc.GreyWidthID,
                        FinishWidthID = adc.FinishWidthID,
                        ComponentID = adc.ComponentID,
                        LengthAllow = adc.LengthAllow,
                        WidthAllow = adc.WidthAllow,
                        Pattern = adc.Pattern
                    });
                }
                foreach (var item1 in List)
                {


                    if ((item1.Fabric_Type == "KNITS" || item1.Fabric_Type == "K") || (item1.Fabric_Type == "PANELS" || item1.Fabric_Type == "P"))
                    {

                        foreach (var value in ConList)
                        {

                            if (value.CompSlNo == item1.CompSlNo)
                            {

                                PQty = value.Prdn_Qty;
                                CID = value.ColorID;
                                SID = value.SizeId;
                                PlanId = AmPlId;
                                CompSl = (int)value.CompSlNo;
                                CPlanSl = (int)value.CPlanSlNo;
                                Gramm = (decimal)value.Grammage;
                                Wght = value.Weight;
                                FWidth = (int)value.FinishWidthID;
                                GWidth = (int)value.GreyWidthID;
                                length = value.Length;
                                width = value.Width;
                                gsm = value.GSM;



                                var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objPmas.Order_No && b.Styleid == objPmas.StyleID).FirstOrDefault();
                                if (GStyRId != null)
                                {
                                    StyRowId = GStyRId.StyleRowid;
                                    OrdNo = GStyRId.order_no;

                                }

                                if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                {

                                    int Pgc = entities.Proc_Apparel_InsertConsumptionAvg(value.CompSlNo, AmPlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objPmas.Order_No, StyRowId, objPmas.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "AA");
                                    entities.SaveChanges();

                                }
                                else if (CID > 0 && SID > 0)
                                {


                                    value.PlanID = AmPlId;
                                    value.ComponentID = item1.ComponentID;
                                    entities.Con_Plan_Amend.Add(value);
                                    //    }
                                    //}
                                }
                            }
                        }
                    }
                    else if (item1.Fabric_Type == "WOVEN" || item1.Fabric_Type == "W")
                    {

                        foreach (var item in objPDet)
                        {

                            foreach (var value in ConList)
                            {

                                if (value.CompSlNo == item.CompSlNo)
                                {
                                    if (value.CompSlNo == item1.CompSlNo)
                                    {

                                        PQty = value.Prdn_Qty;
                                        CID = value.ColorID;
                                        SID = value.SizeId;
                                        PlanId = AmPlId;
                                        CompSl = (int)value.CompSlNo;
                                        CPlanSl = (int)value.CPlanSlNo;
                                        Gramm = (decimal)value.Grammage;
                                        Wght = value.Weight;
                                        FWidth = (int)value.FinishWidthID;
                                        GWidth = (int)value.GreyWidthID;
                                        length = value.Length;
                                        width = value.Width;
                                        gsm = value.GSM;



                                        var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objPmas.Order_No && b.Styleid == objPmas.StyleID).FirstOrDefault();
                                        if (GStyRId != null)
                                        {
                                            StyRowId = GStyRId.StyleRowid;
                                            OrdNo = GStyRId.order_no;

                                        }

                                        if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                        {


                                            int Pgc = entities.Proc_Apparel_InsertConsumptionWovenAvg(value.CompSlNo, AmPlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, item.Woven_Req_InMtrs, item.Fabric_Req, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objPmas.Order_No, StyRowId, objPmas.ItemID, item.ColorID, item.SizeId, item1.ComponentID, "W", "AA");
                                            entities.SaveChanges();

                                        }
                                        else if (CID > 0 && SID > 0)
                                        {
                                            //foreach (var conpitem in objPCDet)
                                            //{
                                            //    if (conpitem.ColorID > 0 && conpitem.SizeId > 0)
                                            //    {

                                            value.PlanID = AmPlId;
                                            value.ComponentID = item1.ComponentID;
                                            entities.Con_Plan_Amend.Add(value);
                                            //    }
                                            //}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                entities.SaveChanges();

                //Fabric Save
                var FList = new List<Repository.Fabric_Plan_Amend>();
                foreach (var ad in objPDet)
                {
                    FList.Add(new Repository.Fabric_Plan_Amend
                    {

                        FPlanId = ad.FPlanId,
                        CompSlNo = ad.CompSlNo,
                        PlanID = AmPlId,
                        ColorID = ad.ColorID,
                        SizeId = ad.SizeId,
                        Prdn_Qty = ad.Prdn_Qty,
                        Fabric_Req = ad.Fabric_Req,
                        Grammage = ad.Grammage,
                        Woven_Req_InMtrs = ad.Woven_Req_InMtrs,
                        LossGain = ad.LossGain,
                        FabricId = ad.FabricId,
                        Fabric_type = ad.Fabric_type,
                        Fab_WidthId = ad.Fab_WidthId,
                        Table_WidthID = ad.Table_WidthID,
                        BaseColorID = ad.BaseColorID,
                        BColorPur_Qty = ad.BColorPur_Qty,
                        FinishColorID = ad.FinishColorID,
                        FColorPur_Qty = ad.FColorPur_Qty,
                        PrintColorId = ad.PrintColorId,
                        EntryDate = ad.EntryDate,
                        Knit_GSM = ad.Knit_GSM,
                        Fin_GSM = ad.Fin_GSM,
                        Loop_Len = ad.Loop_Len,
                        Texture = ad.Texture,
                        Content = ad.Content,
                        Gauge = ad.Gauge
                    });
                }

                var FLossList = new List<Repository.Fab_Plan_ProLoss_Amend>();
                foreach (var adp in objPLDet)
                {
                    FLossList.Add(new Repository.Fab_Plan_ProLoss_Amend
                    {

                        FLPlanID = adp.FLPlanID,
                        FPlanId = adp.FPlanId,
                        SlNo = adp.SlNo,
                        ProcessId = adp.ProcessId,
                        Loss_Per = adp.Loss_Per,
                        CompSlNo = adp.CompSlNo
                    });
                }
                foreach (var item in FList)
                {

                    item.PlanID = AmPlId;
                    entities.Fabric_Plan_Amend.Add(item);
                    entities.SaveChanges();
                    FPID = (int)item.FPlanId;

                    foreach (var itemL in FLossList)
                    {
                        if (item.CompSlNo == itemL.CompSlNo && CProcessId != itemL.ProcessId)
                        {
                            itemL.FPlanId = FPID;
                            entities.Fab_Plan_ProLoss_Amend.Add(itemL);
                            ProcessId = itemL.ProcessId;

                        }
                        CProcessId = ProcessId;

                    }

                }


                //YARN Modify save
                var YList = new List<Repository.Yarn_Plan_Mas_Amend>();
                foreach (var ady in objPYDet)
                {
                    YList.Add(new Repository.Yarn_Plan_Mas_Amend
                    {

                        YPlanmasID = ady.YPlanmasID,
                        PlanId = AmPlId,
                        FabricID = ady.FabricID,
                        Fabric_ColorId = ady.Fabric_ColorId,
                        Fabric_Weight = ady.Fabric_Weight,
                        Fabric_type = ady.Fabric_type,
                        EntryDate = ady.EntryDate,
                        SlNo = ady.SlNo,
                        ComponentID = ady.ComponentID,
                        CompSlNo = ady.CompSlNo

                    });
                }
                //YarnDet
                var YDList = new List<Repository.Yarn_Plan_Det_Amend>();
                foreach (var add in objPYDDet)
                {
                    YDList.Add(new Repository.Yarn_Plan_Det_Amend
                    {

                        YPlanDetID = add.YPlanDetID,
                        YPlanMasID = add.YPlanMasID,
                        Knit_In_ItemId = add.Knit_In_ItemId,
                        Knit_In_SizeID = add.Knit_In_SizeID,
                        Knit_in_ColorID = add.Knit_in_ColorID,
                        Knit_In_Per = add.Knit_In_Per,
                        Knit_In_Qty = add.Knit_In_Qty,
                        Loss_per = add.Loss_per,
                        Dyeing_Req = add.Dyeing_Req,
                        SlNo = add.SlNo,
                        YSNo = add.YSNo,
                        FabricID = add.FabricID,
                        Fabric_ColorId = add.Fabric_ColorId
                    });
                }

                //YarnLoss
                var YLList = new List<Repository.Yarn_Plan_ProLoss_Amend>();
                foreach (var adyl in objPYLDet)
                {
                    YLList.Add(new Repository.Yarn_Plan_ProLoss_Amend
                    {
                        YPlanLossID = adyl.YPlanLossID,
                        YPlanDetID = adyl.YPlanDetID,
                        SlNo = adyl.SlNo,
                        ProcessId = adyl.ProcessId,
                        Loss_Per = adyl.Loss_Per,
                        FSNo = adyl.FSNo,
                        CompSNo = adyl.CompSNo
                    });
                }

                //YarnDyeing
                var YDYList = new List<Repository.Yarn_Plan_Dyeing_Amend>();
                foreach (var ady in objPDyet)
                {
                    YDYList.Add(new Repository.Yarn_Plan_Dyeing_Amend
                    {
                        YPlanDyeID = ady.YPlanDyeID,
                        YPlanDetID = ady.YPlanDetID,
                        SlNo = ady.SlNo,
                        Garment_ColorID = ady.Garment_ColorID,
                        GWeight = ady.GWeight,
                        Yarn_DyeColorID = ady.Yarn_DyeColorID,
                        Qty_Per = ady.Qty_Per,
                        Weight = ady.Weight,
                        Purchase_Qty = ady.Purchase_Qty,
                        Courses = ady.Courses,
                        YSNo = ady.YSNo,
                        CompSlNo = ady.CompSlNo
                    });
                }

                foreach (var item in YList)
                {

                    item.PlanId = AmPlId;
                    entities.Yarn_Plan_Mas_Amend.Add(item);
                    entities.SaveChanges();
                    YPID = (int)item.YPlanmasID;



                    //detItem.SlNo =ComponentSerial No ,detItem.YSNo=Yarnpalnmasserial No 

                    foreach (var detItem in YDList)
                    {

                        ComSno = (int)detItem.SlNo;


                        //if (ComSno == item.CompSlNo && detItem.Fabric_ColorId == item.Fabric_ColorId && detItem.FabricID == item.FabricID && item.SlNo==detItem.YSNo)
                        //{


                        if (ComSno == item.CompSlNo && detItem.YSNo == item.SlNo)
                        {
                            detItem.YPlanMasID = YPID;
                            entities.Yarn_Plan_Det_Amend.Add(detItem);
                            entities.SaveChanges();
                            YDPID = (int)detItem.YPlanDetID;
                            foreach (var itemL in YLList)
                            {
                                if (detItem.YSNo == itemL.FSNo && itemL.CompSNo == detItem.SlNo)
                                {
                                    itemL.YPlanDetID = YDPID;
                                    entities.Yarn_Plan_ProLoss_Amend.Add(itemL);

                                }

                            }
                            foreach (var itemDy in YDYList)
                            {
                                if (detItem.YSNo == itemDy.YSNo && detItem.SlNo == itemDy.CompSlNo && detItem.Dyeing_Req == true)
                                {
                                    itemDy.YPlanDetID = YDPID;
                                    entities.Yarn_Plan_Dyeing_Amend.Add(itemDy);
                                }
                            }
                        }
                    }
                }
                //

                reserved = true;

            }
            catch (Exception ex)
            {

                exceplogg.SendExcepToDB(ex, "PlanningConsumption-AddDetConItemData");
            }
            return reserved;


        }


        public IList<Bom> GetDataRepCheckPoIndDetails(string OrdNo, int StyId, int Itmid, int Colorid, int Sizeid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPoYarnEntryChkDetails(OrdNo, StyId, Itmid, Colorid, Sizeid)
                         select new Bom
                         {
                             PoNo = YD1.pur_ord_no,
                             PurOrdId = YD1.pur_ord_id,


                         }).AsQueryable();

            return query.ToList();
        }


        public bool PrintAdd(User_Print_Log objPrintAd, int Stylerowid)
        {
            bool reserved = false;

            string ordno = "";
            string machineName = System.Environment.MachineName;
            string hostName = Dns.GetHostAddresses(Environment.MachineName)[0].ToString();


            string strHostName = System.Net.Dns.GetHostName();
            string clientIPAddress = System.Net.Dns.GetHostAddresses(strHostName).GetValue(0).ToString();


            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == Stylerowid).FirstOrDefault();
                    if (OQuery != null)
                    {
                        ordno = OQuery.order_no;
                    }

                    objPrintAd.EntryNo = ordno;
                    objPrintAd.MachineName = machineName;
                    objPrintAd.MachineIP = "Test";
                    objPrintAd.PrintingDateTime = DateTime.Now;
                    //var id = entities.User_Print_Log.Add(objPrintAd);
                    //entities.SaveChanges();


                    var Pg1 = entities.proc_apparel_PrintLogInsert(objPrintAd.UserID, objPrintAd.ModuleName, objPrintAd.DocumentName, objPrintAd.MachineName, objPrintAd.MachineIP, objPrintAd.PrintingDateTime, ordno);
                    entities.SaveChanges();

                    //

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                    //
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }

            }
            return reserved;

        }





        public IQueryable<PlanningMain> GetDataPrintCheckDetails(int Id)
        {
            string ordno = "";
            string Doc = "COSTING ORDER";

            var OQuery = entities.buy_ord_style.Where(b => b.StyleRowid == Id).FirstOrDefault();
            if (OQuery != null)
            {
                ordno = OQuery.order_no;
            }

            IQueryable<PlanningMain> query = (from a in entities.proc_apparel_PrintLogReport(Doc, ordno)
                                              select new PlanningMain
                                              {
                                                  PrintUserId = a.userprintid,
                                                  PrintName = a.PName,


                                              }).AsQueryable();

            return query;
        }

        public IQueryable<PlanningMain> LoadProcess(int GItemId, int StyRowId, string BmasId)
        {
            IQueryable<PlanningMain> query = (from a in entities.Proc_Apparel_GetPlanningCompProcessList(GItemId, StyRowId, BmasId)
                                              select new PlanningMain
                                              {
                                                  Process = a.Process,
                                                  Processid = a.Processid,
                                                  ProcessLoss = a.ProcessLoss

                                              }).AsQueryable();

            return query;
        }
        public IQueryable<PlanningMain> LoadYarn(int GItemId, int StyRowId, string BmasId)
        {
            IQueryable<PlanningMain> query = (from a in entities.Proc_Apparel_GetPlanningCompYarnList(GItemId, StyRowId, BmasId)
                                              select new PlanningMain
                                              {
                                                  Yarn = a.Yarn,
                                                  YarnId = a.YarnId,

                                              }).AsQueryable();

            return query;
        }
        public IQueryable<PlanningMain> LoadFabric(int GItemId, int StyRowId, string BmasId)
        {
            IQueryable<PlanningMain> query = (from a in entities.Proc_Apparel_GetPlanningCompFabricList(GItemId, StyRowId, BmasId)
                                              select new PlanningMain
                                              {
                                                  fabric = a.fabric,
                                                  FabricId = a.FabricId,
                                              }).AsQueryable();

            return query;
        }


        public IQueryable<Domain.OrdCons_Mas> LoadMeasRepFabric(int GItemId, int StyRowId, int BmasId)
        {
            IQueryable<Domain.OrdCons_Mas> query = (from T in entities.OrdCons_Mas.Where(c => c.GarmentItemid == GItemId && c.StyleRowId == StyRowId && c.BmasId == BmasId)

                                                    select new Domain.OrdCons_Mas
                                             {
                                                 ordconsavggramage = (decimal)T.ordconsavggramage,
                                                 ordconsmasid = T.ordconsmasid,
                                             }).AsQueryable();

            return query;
        }


        public IList<PlanCompDetails> GetRepCopyConDetTotList(int itemId, int StyleRowId, int PlanID, int CopyStyRowID, int CopyItemID)
        {
            var query = (from Ecn in entities.Proc_Apparel_GetPlanningEditCopyContotItemList(itemId, StyleRowId, PlanID, CopyStyRowID, CopyItemID)
                         select new PlanCompDetails
                         {

                             CompSlNo = (int)Ecn.CompSlNo,
                             CPlanSlNo = (int)Ecn.CPlanSlNo,
                             ColorID = Ecn.colorId,
                             SizeId = Ecn.SizeId,
                             Prdn_Qty = Ecn.PQty,
                             Color = Ecn.Color,
                             Size = Ecn.Size,
                             Length = Ecn.Len,
                             Width = Ecn.Width,
                             GSM = Ecn.Gsm,
                             Grammage = Ecn.Gram,
                             Weight = (decimal)Ecn.Weight,
                             GreyWidth = Ecn.GWidth,
                             GreyWidthID = Ecn.GWidthId,
                             FinishWidth = Ecn.FWidth,
                             FinishWidthID = Ecn.FWidthId,
                             Con_PlanID = Ecn.Con_PlanID,
                             Requirement = Ecn.Len,
                             WtMetre = Ecn.Gsm,
                             TotMetres = (decimal)Ecn.Wmeter,
                             No_Of_Parts = Ecn.Parts,
                             type = Ecn.FabType,
                             GmsPieces = Ecn.Gram,
                             TotPieces = (decimal)Ecn.PQty * Ecn.Parts,
                             AlloLen = (decimal)Ecn.LengthAllow,
                             AllowWid = (decimal)Ecn.WidthAllow,
                             Pattern = (decimal)Ecn.Pattern
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PlanningFabricDetails> GetConCopyFabricPlantotList(int PId, int CopyStyRowID, int CopyItemID)
        {
            var query = (from Ecnp in entities.Proc_Apparel_GetPlanningFabricCopyComDetEditTotItemList(PId, CopyStyRowID, CopyItemID)
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
                             //Weight = Ecnp.ActWeight,
                             //ActWeight = Ecnp.Weight,

                             // Weight = Ecnp.Fabric_type=="K"? Ecnp.Weight:Ecnp.WMetres,
                             //ActWeight = Ecnp.Fabric_type == "K" ? Ecnp.Weight : Ecnp.WMetres,

                             Weight = (decimal)Ecnp.ActWeight,//Ecnp.Fabric_type == "K" ? Ecnp.ActWeight : Ecnp.Fabric_type == "W" ? Ecnp.WMetres : Ecnp.Woven_Req_InMtrs,
                             ActWeight = (decimal)Ecnp.Weight,//Ecnp.Fabric_type == "K" ? Ecnp.Weight : Ecnp.Fabric_type == "W" ? Ecnp.WMetres : Ecnp.Woven_Req_InMtrs,

                             GreyWidth = Ecnp.GreyWidth,
                             GreyWidthID = Ecnp.GreyWidthID,
                             FinishWidth = Ecnp.FinishWidth,
                             FinishWidthID = Ecnp.FinishWidthID,
                             FPlanId = Ecnp.FPlanId,
                             PlanID = Ecnp.PlanID,
                             Woven_Req_InMtrs = (decimal)Ecnp.Weight,
                             LossGain = (int)Ecnp.LossGain,
                             FabricID = (int)Ecnp.FabricID,
                             Fabric = Ecnp.Fabric,
                             FabricType = Ecnp.Fabric_type,
                             BColorID = Ecnp.BaseColorID,
                             BColorPQty = (decimal)Ecnp.BColorPur_Qty,
                             FColorID = Ecnp.FinishColorID,
                             FColorPQty = (decimal)Ecnp.FColorPur_Qty,
                             PColorID = Ecnp.PrintColorId,
                             EntryDate = (DateTime)Ecnp.EntryDate,
                             KGsm = Ecnp.Knit_GSM == "" ? "" : Ecnp.Knit_GSM,
                             FGsm = Ecnp.Fin_GSM == "" ? "" : Ecnp.Fin_GSM,
                             snumb = (int)Ecnp.Snumb,
                             guage = Ecnp.Gauge == "" ? "" : Ecnp.Gauge,
                             texture = Ecnp.Texture == "" ? "" : Ecnp.Texture,
                             LoopLen = Ecnp.Loop_Len == "" ? "" : Ecnp.Loop_Len,
                             content = Ecnp.Content == "" ? "" : Ecnp.Content,


                         }).AsQueryable();

            return query.ToList();
        }


        public IList<PlanningYarn> GetFabricCopyItemDetails(int PId, int CopyStyRowID, int CopyItemID)
        {
            var query = (from Y in entities.Proc_GetCopyFabricDetailsForYarn(PId, CopyStyRowID, CopyItemID)
                         select new PlanningYarn
                         {
                             YPlanmasID = Y.YPmasID,
                             PlanId = PId,
                             FabricID = Y.ItemID,
                             Fabric_ColorId = Y.ColorID,
                             Fabric_Weight = (decimal)Y.Fabric_Req,
                             Fabric_type = Y.Fabric_type,
                             EntryDate = (DateTime)Y.Entrydate,
                             Fabric = Y.Fabric,
                             BColor = Y.BColor,
                             YSlno = (int)Y.SlNo,
                             SlNo = Y.CompSlNo,
                             Component = Y.Component,
                             ComponentId = Y.ComponentId,
                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PlanningYarnDet> GetEditCopyYarnDetDetails(int PId, int CopyStyRowID, int CopyItemID)
        {
            var query = (from Ed in entities.Proc_Apparel_GetPlanningCopyYarnEditDetItemList(PId, CopyStyRowID, CopyItemID)
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
                             Knit_In_ActQty = (decimal)Ed.Knit_In_Qty,
                             Loss_per = Ed.Loss_per,
                             Dyeing_Req = Ed.Dyeing_Req,
                             YSlNo = Ed.YSlNo,
                             SlNo = (int)Ed.SlNo,
                             FabricID = Ed.FabricID,
                             BaseColorID = Ed.Fabric_ColorId,
                             CompSno = Ed.CompSlNo,
                         }).AsQueryable();

            return query.ToList();
        }
        public IQueryable<PlanningMain> LoadCopyOrder(string OrderNo)
        {
            IQueryable<PlanningMain> query = (from a in entities.Proc_Apparel_GetPlanningCopyOrderNoList(OrderNo)
                                              select new PlanningMain
                                              {
                                                  Order_No = a.Order_No,
                                                  BMasID = a.Buy_Ord_MasId,
                                              }).AsQueryable();

            return query;
        }


        public bool AddDetConsumDetItemData(Planning_Mas objcPlan, List<Comp_Plan_Mas> objPcCMDet, List<Con_Plan> objPcconDet, string PrgThr, string Mode)
        {
            bool reserved = false;
            int PlId = 0;
            int OMasId = 0;
            string OrdNo = "";
            int StyRowId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //Delete the Programm_Summary Table 

                    var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == objcPlan.Order_No).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasId = OQuery.Buy_Ord_MasId;
                    }

                    //var result3 = entities.Proc_Apparel_DeleteConProgSum(OMasId, objcPlan.CompanyID, objcPlan.StyleID, objcPlan.ItemID);
                    //entities.SaveChanges();

                    //Check the Planning Entry Made
                    var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objcPlan.Order_No && b.StyleID == objcPlan.StyleID && b.CompanyID == objcPlan.CompanyID && b.ItemID == objcPlan.ItemID).FirstOrDefault();
                    if (OQueryP != null)
                    {
                        PlId = OQueryP.PlanID;
                        if (PlId > 0)
                        {
                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Con_Plan = "E";
                            }
                            entities.SaveChanges();
                        }
                    }
                    else
                    {
                        if (objcPlan.PlanID == 0)
                        {
                            //var planmas = entities.Proc_Apparel_InsertConsumptionPlanMas(objPmas.CompanyID, objPmas.Buy_Ord_MasId, objPmas.Order_No, objPmas.StyleID, objPmas.ItemID, objPmas.CreatedBy);
                            //entities.SaveChanges();

                            //var POQuery = entities.Planning_Mas.Where(b => b.Order_No == objPmas.Order_No && b.StyleID == objPmas.StyleID && b.ItemID == objPmas.ItemID).FirstOrDefault();
                            //if (POQuery != null)
                            //{
                            //    PlId = POQuery.PlanID;
                            //}

                            entities.Planning_Mas.Add(objcPlan);
                            entities.SaveChanges();
                            PlId = objcPlan.PlanID;
                        }
                        else
                        {
                            PlId = objcPlan.PlanID;
                        }
                    }
                    //foreach (var item in objPcCMDet)
                    //{

                    //}
                    //entities.SaveChanges();

                    foreach (var item1 in objPcCMDet)
                    {
                        item1.PlanID = PlId;
                        var commas = entities.Proc_Apparel_InsertConsumptionCompMas(item1.Entry_Date, item1.CompSlNo, item1.PlanID, item1.ComponentID, item1.No_Of_Parts, item1.Fabric_Type, item1.Grouping, item1.Unit, item1.Description, item1.FabricID, item1.GSM);
                        entities.SaveChanges();


                        if ((item1.Fabric_Type == "KNITS" || item1.Fabric_Type == "K") || (item1.Fabric_Type == "PANELS" || item1.Fabric_Type == "P"))
                        {
                            foreach (var value in objPcconDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;

                                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objcPlan.Order_No && b.Styleid == objcPlan.StyleID).FirstOrDefault();
                                    if (GStyRId != null)
                                    {
                                        StyRowId = GStyRId.StyleRowid;
                                        OrdNo = GStyRId.order_no;
                                    }
                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgc = entities.Proc_Apparel_InsertConsumptionAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objcPlan.Order_No, StyRowId, objcPlan.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        var conplan = entities.Proc_Apparel_InsertConsumptionConPlan(value.CompSlNo, value.CPlanSlNo, value.PlanID, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.Weight, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objcPlan.Order_No, StyRowId, objcPlan.ItemID, value.ColorID, value.SizeId, value.ComponentID, value.Prdn_Qty, "NA");
                                        entities.SaveChanges();
                                    }
                                }
                            }
                        }
                        else if (item1.Fabric_Type == "WOVEN" || item1.Fabric_Type == "W")
                        {
                            foreach (var value in objPcconDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;

                                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objcPlan.Order_No && b.Styleid == objcPlan.StyleID).FirstOrDefault();
                                    if (GStyRId != null)
                                    {
                                        StyRowId = GStyRId.StyleRowid;
                                        OrdNo = GStyRId.order_no;
                                    }
                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgc = entities.Proc_Apparel_InsertConsumptionWovenAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objcPlan.Order_No, StyRowId, objcPlan.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "W", "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        entities.Con_Plan.Add(value);
                                    }
                                }
                            }
                        }
                    }
                    entities.SaveChanges();
                    // For Insert Program Summary
                    int Pg = entities.Proc_Apparel_InsertConsumptionPrgSum(PlId);
                    entities.SaveChanges();


                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                    //
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PlanningConsumption-AddDetConItemData");
                }

            }
            return reserved;
        }


        public bool UpdateConSumDetData(Planning_Mas objCEAd, List<Comp_Plan_Mas> objPECMDet, List<Con_Plan> objPEconDet, string PrgThr, string Mode)
        {
            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var styId = 0;
            var PId = 0;
            int StyRowId = 0;
            int PlId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objCEAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }

                    var GStyRId = entities.buy_ord_style.Where(b => b.order_no == objCEAd.Order_No && b.Styleid == objCEAd.StyleID).FirstOrDefault();
                    if (GStyRId != null)
                    {
                        StyRowId = GStyRId.StyleRowid;
                    }

                    ////Delete the Programm_Summary Table                    
                    //var resultCon = entities.Proc_Apparel_DeleteConProgSum(OmasId, objCEAd.CompanyID, objCEAd.StyleID, objCEAd.ItemID);
                    //entities.SaveChanges();
                    //
                    //Delete conplan
                    var Pgc = entities.Proc_Apparel_DeleteConsumptionConDetails(objCEAd.PlanID);
                    entities.SaveChanges();
                    //
                    ////Check the Planning Entry Made
                    //var OQueryP = entities.Planning_Mas.Where(b => b.Order_No == objCEAd.Order_No && b.StyleID == objCEAd.StyleID && b.CompanyID == objCEAd.CompanyID).FirstOrDefault();
                    //if (OQueryP != null)
                    //{
                    //    PlId = OQueryP.PlanID;
                    //    if (PlId > 0)
                    //    {
                    //        var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                    //        if (AppMas != null)
                    //        {
                    //            AppMas.Con_Plan = "N";
                    //            AppMas.Fabric_Plan = "N";
                    //            AppMas.Yarn_Plan = "N";
                    //        }
                    //        entities.SaveChanges();
                    //    }
                    //}
                    //else
                    //{
                    //    if (objCEAd.PlanID == 0)
                    //    {
                    //        objCEAd.ModifyBy = objCEAd.CreatedBy;
                    //        objCEAd.Modify_Date = DateTime.Now;
                    //        var id = entities.Planning_Mas.Add(objCEAd);
                    //        entities.SaveChanges();
                    //        PlId = objCEAd.PlanID;
                    //    }
                    //    else
                    //    {
                    //        objCEAd.ModifyBy = objCEAd.CreatedBy;
                    //        objCEAd.Modify_Date = DateTime.Now;
                    //        PlId = objCEAd.PlanID;
                    //    }
                    //}

                    //entities.SaveChanges();
                    ////////////Edit Case For ALL

                    //Check the Planning Entry Made
                    var EOQueryP = entities.Planning_Mas.Where(b => b.Order_No == objCEAd.Order_No && b.StyleID == objCEAd.StyleID && b.CompanyID == objCEAd.CompanyID && b.ItemID == objCEAd.ItemID).FirstOrDefault();
                    if (EOQueryP != null)
                    {
                        PlId = EOQueryP.PlanID;
                        if (PlId > 0)
                        {
                            var AppMas = entities.Planning_Mas.Where(c => c.PlanID == PlId).FirstOrDefault();
                            if (AppMas != null)
                            {
                                AppMas.Con_Plan = "E";
                                AppMas.ComAmend = "N";
                                AppMas.FabAmend = "Y";
                                AppMas.YarnAmend = "Y";
                            }
                            entities.SaveChanges();
                        }
                    }
                    else
                    {
                        if (objCEAd.PlanID == 0)
                        {
                            objCEAd.ModifyBy = objCEAd.CreatedBy;
                            objCEAd.Modify_Date = DateTime.Now;
                            var id = entities.Planning_Mas.Add(objCEAd);
                            entities.SaveChanges();
                            PlId = objCEAd.PlanID;
                        }
                        else
                        {
                            objCEAd.ModifyBy = objCEAd.CreatedBy;
                            objCEAd.Modify_Date = DateTime.Now;
                            PlId = objCEAd.PlanID;
                        }
                    }

                    foreach (var item1 in objPECMDet)
                    {

                        item1.PlanID = PlId;
                        var commas = entities.Proc_Apparel_InsertConsumptionCompMas(item1.Entry_Date, item1.CompSlNo, item1.PlanID, item1.ComponentID, item1.No_Of_Parts, item1.Fabric_Type, item1.Grouping, item1.Unit, item1.Description, item1.FabricID, item1.GSM);
                        entities.SaveChanges();

                        if ((item1.Fabric_Type == "KNITS" || item1.Fabric_Type == "K") || (item1.Fabric_Type == "PANELS" || item1.Fabric_Type == "P"))
                        {
                            foreach (var value in objPEconDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;

                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgcv = entities.Proc_Apparel_InsertConsumptionAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objCEAd.Order_No, StyRowId, objCEAd.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        entities.Con_Plan.Add(value);
                                    }
                                }
                            }
                        }
                        else if (item1.Fabric_Type == "WOVEN" || item1.Fabric_Type == "W")
                        {
                            foreach (var value in objPEconDet)
                            {
                                if (value.CompSlNo == item1.CompSlNo)
                                {
                                    PQty = value.Prdn_Qty;
                                    CID = value.ColorID;
                                    SID = value.SizeId;
                                    PlanId = PlId;
                                    CompSl = value.CompSlNo;
                                    CPlanSl = value.CPlanSlNo;
                                    Gramm = (decimal)value.Grammage;
                                    Wght = value.Weight;
                                    FWidth = (int)value.FinishWidthID;
                                    GWidth = (int)value.GreyWidthID;
                                    length = value.Length;
                                    width = value.Width;
                                    gsm = value.GSM;

                                    if ((CID == 0 && SID == 0) || (CID == 0) || (SID == 0))
                                    {
                                        int Pgwv = entities.Proc_Apparel_InsertConsumptionWovenAvg(value.CompSlNo, PlId, value.Length, value.Width, value.LengthAllow, value.WidthAllow, value.Pattern, value.GSM, value.Grammage, value.Wmetres, value.Wmetres, value.ActualFabricWidth, value.GreyWidthID, value.FinishWidthID, objCEAd.Order_No, StyRowId, objCEAd.ItemID, value.ColorID, value.SizeId, item1.ComponentID, "W", "NA");
                                        entities.SaveChanges();
                                    }
                                    else if (CID > 0 && SID > 0)
                                    {
                                        value.PlanID = PlId;
                                        value.ComponentID = item1.ComponentID;
                                        entities.Con_Plan.Add(value);
                                    }
                                }
                            }
                        }
                    }
                    entities.SaveChanges();
                    //// For Insert Program Summary
                    //int PgS = entities.Proc_Apparel_InsertConsumptionPrgSum(PlId);
                    //entities.SaveChanges();

                    //var res = AmendData(objCAd, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Upd", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
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


        public bool AddDetFabItemData(Planning_Mas objFabPlan, List<Fabric_Plan> objPDet, List<Fab_Plan_ProLoss> objPLDet)
        {
            bool reserved = false;
            int PlId = 0;
            int OMasId = 0;
            string OrdNo = "";
            int StyRowId = 0;
            int YPalnDetId = 0;
            int FBColorId = 0;
            int FFColorid = 0;
            int FLItemid = 0;
            //int VPlanId = 0;

            int BomColorID = 0;
            decimal BomCorQty = 0;
            int BomSizeID = 0;
            int BomMasId = 0;
            int CBomColorId = 0;
            int CBomSizeid = 0;
            decimal CBomBaseQty = 0;
            int StyId = 0;
            int CompId = 0;
            int ProcessId = 0;
            int CProcessId = 0;
            decimal PlQty = 0;
            decimal CPlQty = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    var result3 = entities.Proc_Apparel_DeleteConProgSum(OMasId, objFabPlan.CompanyID, objFabPlan.StyleID, objFabPlan.ItemID);
                    entities.SaveChanges();


                    //Fabric Save
                    foreach (var item in objPDet)
                    {

                        // var PgYd = entities.Proc_Apparel_InsertConsumptionFabPlan(item.CompSlNo, item.PlanID, item.ColorID, item.SizeId, item.Prdn_Qty, item.Fabric_Req, item.Grammage, item.Woven_Req_InMtrs, item.LossGain, item.FabricId, item.Fabric_type, item.Fab_WidthId, item.Table_WidthID, item.BaseColorID, item.BColorPur_Qty, item.FinishColorID, item.FColorPur_Qty, item.PrintColorId, item.EntryDate, item.Knit_GSM, item.Fin_GSM, item.Loop_Len, item.Texture, item.Content, item.Gauge);
                        entities.Fabric_Plan.Add(item);
                        entities.SaveChanges();
                        FPID = item.FPlanId;
                        PlId = item.PlanID;
                        FBColorId = item.BaseColorID;
                        FFColorid = item.FinishColorID;
                        FLItemid = item.FabricId;


                        foreach (var itemL in objPLDet)
                        {
                            if (item.CompSlNo == itemL.CompSlNo && item.ColorID == itemL.GColorId)
                            {
                                itemL.FPlanId = FPID;
                                itemL.FLBColorId = FBColorId;
                                itemL.FLFColorId = FFColorid;
                                itemL.FLItemId = FLItemid;
                                entities.Fab_Plan_ProLoss.Add(itemL);
                                ProcessId = itemL.ProcessId;
                            }
                            CProcessId = ProcessId;

                        }
                        //////////////////////
                        //For BaseFinColorPurchase
                        BCorQty = BCorQty + item.BColorPur_Qty;
                        FCorQty = FCorQty + (decimal)item.FColorPur_Qty;

                        // delete the bommas & bomdet table for fabric purchase
                        if ((BCorQty > 0) || (FCorQty > 0))
                        {
                            var OQuery1 = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objFabPlan.Order_No) && (b.Styleid == objFabPlan.StyleID)).FirstOrDefault();
                            if (OQuery1 != null)
                            {
                                BomMasId = OQuery1.Buy_Ord_BOMid;
                            }
                            if (BomMasId == 0)
                            {
                                if ((BCorQty > 0) || (FCorQty > 0))
                                {
                                    //var OrderNo = objPmas.Order_No;
                                    //var StyleId = StyId;
                                    //var CompId = objPmas.CompanyID;
                                    var Access_Type = "F";
                                    var Prog_Thru = "B";
                                    var PgF = entities.Proc_Apparel_GetPlanningFabricInsertFabBFPurQtyMas(objFabPlan.Order_No, objFabPlan.StyleID, Access_Type, Prog_Thru, objFabPlan.CompanyID);
                                    entities.SaveChanges();
                                }
                            }
                            var OQueryF = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objFabPlan.Order_No) && (b.Styleid == objFabPlan.StyleID)).FirstOrDefault();
                            if (OQueryF != null)
                            {
                                BomMasId = OQueryF.Buy_Ord_BOMid;

                            }
                            if (CBomColorId == item.BaseColorID && CBomSizeid == item.Table_WidthID)
                            {
                                if (item.BColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + item.BColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFabPlan.CompanyID, objFabPlan.Order_No, objFabPlan.StyleID);
                                entities.SaveChanges();
                            }

                            else
                            {
                                if ((item.BColorPur_Qty > 0))
                                {
                                    BCorQty = item.BColorPur_Qty;
                                    if (BCorQty > 0)
                                    {
                                        BomColorID = item.BaseColorID;
                                        BomCorQty = item.BColorPur_Qty;
                                        BomSizeID = item.Table_WidthID;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFabPlan.CompanyID, objFabPlan.Order_No, objFabPlan.StyleID);
                                    entities.SaveChanges();
                                }
                            }
                            CBomColorId = BomColorID;
                            CBomSizeid = BomSizeID;
                            CBomBaseQty = BomCorQty;
                            if (CBomColorId == item.FinishColorID && CBomSizeid == item.Fab_WidthId)
                            {
                                if (item.FColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + (decimal)item.FColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFabPlan.CompanyID, objFabPlan.Order_No, objFabPlan.StyleID);
                                entities.SaveChanges();
                            }
                            else
                            {
                                if ((item.FColorPur_Qty > 0))
                                {
                                    FCorQty = (decimal)item.FColorPur_Qty;
                                    if (FCorQty > 0)
                                    {
                                        BomColorID = item.FinishColorID;
                                        BomCorQty = (decimal)item.FColorPur_Qty;
                                        BomSizeID = item.Fab_WidthId;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFabPlan.CompanyID, objFabPlan.Order_No, objFabPlan.StyleID);
                                    entities.SaveChanges();
                                }
                            }
                            CBomColorId = BomColorID;
                            CBomBaseQty = BomCorQty;
                            CBomSizeid = BomSizeID;
                        }
                    }

                    // For Insert Program Summary
                    int Pg = entities.Proc_Apparel_InsertConsumptionPrgSum(PlId);
                    entities.SaveChanges();

                    //Insert into PrgSum
                    var Pg3 = entities.sp_ProgSum_Fabric1(objFabPlan.Order_No, objFabPlan.CompanyID, "W", objFabPlan.StyleID, PlId, "A");
                    entities.SaveChanges();
                    //Update into Cost and Plan
                    var Pg4 = entities.Proc_Apparel_GetPlanFabricCostUpdate(objFabPlan.Order_No, objFabPlan.StyleID, PlId);
                    entities.SaveChanges();


                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PlId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Fabric_Plan = "E";
                    }

                    //var res = AmendData(objPmas, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Add", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                    //
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PlanningConsumption-AddDetConItemData");
                }

            }
            return reserved;
        }

        public IQueryable<Domain.PlanningMain> LoadEntrystatus(string Ordno, int Styleid, int Itmid)
        {
            IQueryable<Domain.PlanningMain> query = (from a in entities.Planning_Mas.Where(o => (o.Order_No == Ordno) && (o.StyleID == Styleid) && (o.ItemID == Itmid))
                                                     select new Domain.PlanningMain
                                              {
                                                  Con_Plan = a.Con_Plan,
                                                  Yarn_Plan = a.Yarn_Plan,
                                                  Fabric_Plan = a.Fabric_Plan,
                                                  PlanID = a.PlanID,
                                                  YarnAmend = String.IsNullOrEmpty(a.YarnAmend) ? "N" : a.YarnAmend,
                                                  FabAmend = String.IsNullOrEmpty(a.FabAmend) ? "N" :a.FabAmend,
                                                  ComAmend = String.IsNullOrEmpty(a.ComAmend) ? "N" : a.ComAmend,
                                                  Bit_Plan = String.IsNullOrEmpty(a.Bit_Plan) ? "N" : a.Bit_Plan,
                                                  BitAmend = String.IsNullOrEmpty(a.BitAmend) ? "N" : a.BitAmend,
                                                  LockBit = a.LockBit
                                              }).AsQueryable();

            return query;
        }


        public bool UpdateFabDetData(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, List<Fab_Plan_ProLoss> objPFLDet, string PrgThr, string Mode)
        {
            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var Pt = "W";
            var styId = 0;
            var PId = 0;
            var EMode = "D";
            var FType = "";
            int BomColorID = 0;
            decimal BomCorQty = 0;
            int BomSizeID = 0;
            int BomMasId = 0;
            int CBomColorId = 0;
            int CBomSizeid = 0;
            decimal CBomBaseQty = 0;
            int FBColorId = 0;
            int FFColorid = 0;
            int FLItemid = 0;
            int ProcessId = 0;
            int CProcessId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objFEAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }

                    //Delete the Programm_Summary Table                    
                    var resultCon = entities.Proc_Apparel_DeleteConProgSum(OmasId, objFEAd.CompanyID, objFEAd.StyleID, objFEAd.ItemID);
                    entities.SaveChanges();

                    //Delete Fabdet
                    var Pgf = entities.Proc_Apparel_DeleteConsumptionFabDetails(objFEAd.PlanID);
                    entities.SaveChanges();

                    //delete the programm summary table        
                    var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();
                    //


                    //Fabric Save
                    foreach (var item in objFPDet)
                    {
                        item.PlanID = PId;
                        if (item.Fabric_type == "KNITS")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "K")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "PANELS")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "P")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "WOVEN")
                        {
                            FType = "W";
                        }
                        else if (item.Fabric_type == "W")
                        {
                            FType = "W";
                        }

                        item.Fabric_type = FType;
                        entities.Fabric_Plan.Add(item);
                        entities.SaveChanges();
                        FPID = item.FPlanId;
                        FBColorId = item.BaseColorID;
                        FFColorid = item.FinishColorID;
                        FLItemid = item.FabricId;
                        foreach (var itemL in objPFLDet)
                        {
                            //if (item.CompSlNo == itemL.CompSlNo)

                            if (item.CompSlNo == itemL.CompSlNo && item.ColorID == itemL.GColorId)
                            {
                                itemL.FPlanId = FPID;
                                itemL.FLBColorId = FBColorId;
                                itemL.FLFColorId = FFColorid;
                                itemL.FLItemId = FLItemid;
                                entities.Fab_Plan_ProLoss.Add(itemL);
                                ProcessId = itemL.ProcessId;
                            }
                            CProcessId = ProcessId;
                        }
                        BCorQty = BCorQty + item.BColorPur_Qty;
                        FCorQty = FCorQty + (decimal)item.FColorPur_Qty;
                        ////////////////////////
                        if ((BCorQty > 0) || (FCorQty > 0))
                        {
                            var OQueryB = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objFEAd.Order_No) && (b.Styleid == objFEAd.StyleID)).FirstOrDefault();
                            if (OQueryB != null)
                            {
                                BomMasId = OQueryB.Buy_Ord_BOMid;
                            }
                            if (BomMasId == 0)
                            {
                                if ((BCorQty > 0) || (FCorQty > 0))
                                {
                                    var OrderNo = objFEAd.Order_No;
                                    var StyleId = objFEAd.StyleID;
                                    var CompId = objFEAd.CompanyID;
                                    var Access_Type = "F";
                                    var Prog_Thru = "B";
                                    var PgF = entities.Proc_Apparel_GetPlanningFabricInsertFabBFPurQtyMas(OrderNo, StyleId, Access_Type, Prog_Thru, CompId);
                                    entities.SaveChanges();
                                }
                            }
                            var OQueryF = entities.Buy_Ord_BOMMas.Where(b => (b.Order_No == objFEAd.Order_No) && (b.Styleid == objFEAd.StyleID)).FirstOrDefault();
                            if (OQueryF != null)
                            {
                                BomMasId = OQueryF.Buy_Ord_BOMid;
                            }
                            if (CBomColorId == item.BaseColorID && CBomSizeid == item.Table_WidthID)
                            {
                                if (item.BColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + item.BColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFEAd.CompanyID, objFEAd.Order_No, objFEAd.StyleID);
                                entities.SaveChanges();
                            }
                            else
                            {
                                if ((item.BColorPur_Qty > 0))
                                {
                                    BCorQty = item.BColorPur_Qty;
                                    if (BCorQty > 0)
                                    {
                                        BomColorID = item.BaseColorID;
                                        BomCorQty = item.BColorPur_Qty;
                                        BomSizeID = item.Table_WidthID;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFEAd.CompanyID, objFEAd.Order_No, objFEAd.StyleID);
                                    entities.SaveChanges();
                                }
                            }
                            CBomColorId = BomColorID;
                            CBomSizeid = BomSizeID;
                            CBomBaseQty = BomCorQty;
                            if (CBomColorId == item.FinishColorID && CBomSizeid == item.Fab_WidthId)
                            {
                                if (item.FColorPur_Qty > 0)
                                {
                                    BomCorQty = BomCorQty + (decimal)item.FColorPur_Qty;
                                }
                                //delete the bomdet 
                                var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFEAd.CompanyID, objFEAd.Order_No, objFEAd.StyleID);
                                entities.SaveChanges();
                            }
                            else
                            {
                                if ((item.FColorPur_Qty > 0))
                                {
                                    FCorQty = (decimal)item.FColorPur_Qty;
                                    if (FCorQty > 0)
                                    {
                                        BomColorID = item.FinishColorID;
                                        BomCorQty = (decimal)item.FColorPur_Qty;
                                        BomSizeID = item.Fab_WidthId;
                                    }
                                    //delete the bomdet 
                                    var Pg1 = entities.Proc_Apparel_GetPlanningFabricInsertFabDeleteForMultiplePurQty(item.FabricId, BomColorID, BomSizeID, BomCorQty, BomMasId, objFEAd.CompanyID, objFEAd.Order_No, objFEAd.StyleID);
                                    entities.SaveChanges();

                                }
                            }
                            CBomColorId = BomColorID;
                            CBomBaseQty = BomCorQty;
                            CBomSizeid = BomSizeID;
                        }

                    }

                    // For Insert Program Summary
                    int PgS = entities.Proc_Apparel_InsertConsumptionPrgSum(PId);
                    entities.SaveChanges();

                    //Insert into PrgSum
                    var Pg3 = entities.sp_ProgSum_Fabric1(objFEAd.Order_No, objFEAd.CompanyID, PrgThr, objFEAd.StyleID, PId, Mode);
                    entities.SaveChanges();

                    //Delete into BuyOrdbomDet
                    var Pg5 = entities.Proc_Apparel_GetPlanFabricPurDeleteBomUpdate(objFEAd.Order_No, objFEAd.StyleID, PId);
                    entities.SaveChanges();


                    IList<PlanningYarn> YarnList= GetFabricItemDetails( PId);

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Fabric_Plan = "E";
                        Plan.FabAmend = "N";
                        if (YarnList.Count > 0)
                        {
                            Plan.YarnAmend = "Y";
                        }
                        else {
                            Plan.YarnAmend = "N";
                        }

                    }
                    //var res = AmendData(objCAd, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Upd", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
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

        public bool BitFabSave(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, string PrgThr, string Mode)
        {
            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var Pt = "W";
            var styId = 0;
            var PId = 0;
            var EMode = "A";
            var FType = "";
            int BomColorID = 0;
            decimal BomCorQty = 0;
            int BomSizeID = 0;
            int BomMasId = 0;
            int CBomColorId = 0;
            int CBomSizeid = 0;
            decimal CBomBaseQty = 0;
            int FBColorId = 0;
            int FFColorid = 0;
            int FLItemid = 0;
            int ProcessId = 0;
            int CProcessId = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objFEAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }


                    ////Delete Fabdet
                    //var Pgf = entities.Proc_Apparel_DeleteConsumptionFabDetails(objFEAd.PlanID);
                    //entities.SaveChanges();

                    //

                    //Fabric Save
                    foreach (var item in objFPDet)
                    {
                        item.PlanID = PId;

                        var fabpl = entities.Fabric_Plan.Where(m => m.FPlanId == item.FPlanId).FirstOrDefault();
                        if (item.PiecePerBit > 0)
                        {
                            fabpl.PiecePerBit = item.PiecePerBit;
                            fabpl.BitItemId = item.BitItemId;
                            fabpl.BitSizeId = item.BitSizeId;
                        }
                        entities.SaveChanges();
                    }

                    //Insert into PrgSum
                    //var Pg3 = entities.sp_ProgSum_Fabric1(objFEAd.Order_No, objFEAd.CompanyID, PrgThr, objFEAd.StyleID, PId, Mode);
                    //entities.SaveChanges();


                    //Update the programm summary table        
                    var result3 = entities.sp_ProgSum_BitForm(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();


                    IList<PlanningYarn> YarnList = GetFabricItemDetails(PId);

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Bit_Plan = "E";
                    }

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

        public bool BitFabUpdate(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, string PrgThr, string Mode)
        {
            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;

            var styId = 0;
            var PId = 0;
            var Pt = "W";
            var EMode = "A";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objFEAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }


                    ////Delete Fabdet
                    //var Pgf = entities.Proc_Apparel_DeleteConsumptionFabDetails(objFEAd.PlanID);
                    //entities.SaveChanges();

                    ////delete the programm summary table        
                    //var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    //entities.SaveChanges();
                    ////

                    //Fabric Save

                    var Fabdet = entities.Fabric_Plan.Where(c => c.PlanID == objFEAd.PlanID).ToList();

                    foreach (var t in Fabdet)
                    {
                        t.PiecePerBit = 0;
                        t.BitItemId = null;
                        t.BitSizeId = null;
                    }
                    entities.SaveChanges();


                    foreach (var item in objFPDet)
                    {
                        item.PlanID = PId;

                        var fabpl = entities.Fabric_Plan.Where(m => m.FPlanId == item.FPlanId).FirstOrDefault();
                        if (item.PiecePerBit > 0)
                        {
                            fabpl.PiecePerBit = item.PiecePerBit;
                            fabpl.BitItemId = item.BitItemId;
                            fabpl.BitSizeId = item.BitSizeId;
                        }
                        entities.SaveChanges();
                    }

                    ////Insert into PrgSum
                    //var Pg3 = entities.sp_ProgSum_Fabric1(objFEAd.Order_No, objFEAd.CompanyID, PrgThr, objFEAd.StyleID, PId, Mode);
                    //entities.SaveChanges();

                    //Update the programm summary table        
                    var result3 = entities.sp_ProgSum_BitForm(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();

                    IList<PlanningYarn> YarnList = GetFabricItemDetails(PId);

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Bit_Plan = "E";
                    }

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

        public bool BitFabDelete(Planning_Mas objFEAd, List<Fabric_Plan> objFPDet, string PrgThr, string Mode)
        {
            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;

            var styId = 0;
            var PId = 0;
            var Pt = "W";
            var EMode = "A";

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objFEAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }


                    ////Delete Fabdet
                    //var Pgf = entities.Proc_Apparel_DeleteConsumptionFabDetails(objFEAd.PlanID);
                    //entities.SaveChanges();

                    ////delete the programm summary table        
                    //var result3 = entities.sp_ProgSum_Fabric1(OrdNo, cmpid, Pt, styId, PId, EMode);
                    //entities.SaveChanges();
                    ////

                    //Fabric Save

                    var Fabdet = entities.Fabric_Plan.Where(c => c.PlanID == objFEAd.PlanID).ToList();

                    foreach (var t in Fabdet)
                    {
                        t.PiecePerBit = 0;
                        t.BitItemId = null;
                        t.BitSizeId = null;
                    }
                    entities.SaveChanges();

                    //Insert into PrgSum
                    //var Pg3 = entities.sp_ProgSum_Fabric1(objFEAd.Order_No, objFEAd.CompanyID, PrgThr, objFEAd.StyleID, PId, Mode);
                    //entities.SaveChanges();

                    //Update the programm summary table        
                    var result3 = entities.sp_ProgSum_BitForm(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();

                    IList<PlanningYarn> YarnList = GetFabricItemDetails(PId);

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Bit_Plan = "E";
                    }

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



        public bool AddDetYarnItemData(Planning_Mas objYnPlan, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet)
        {
            bool reserved = false;
            int PlId = 0;
            int OMasId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {


                    var OQuery = entities.Buy_Ord_Mas.Where(b => b.Order_No == objYnPlan.Order_No).FirstOrDefault();
                    if (OQuery != null)
                    {
                        OMasId = OQuery.Buy_Ord_MasId;
                    }
                    entities.SaveChanges();
                    var OQuery1 = entities.Planning_Mas.Where(b => b.Order_No == objYnPlan.Order_No && b.ItemID == objYnPlan.ItemID && b.StyleID == objYnPlan.StyleID).FirstOrDefault();
                    if (OQuery1 != null)
                    {
                        PlId = OQuery1.PlanID;
                    }
                    entities.SaveChanges();

                    //Yarn modify save
                    foreach (var item in objPYDet)
                    {
                        if (item.YPlanmasID == 0)
                        {
                            item.PlanId = PlId;
                            //var yp = entities.Proc_Apparel_InsertConsumptionYarnPlan(item.PlanId, item.FabricID, item.Fabric_ColorId, item.Fabric_Weight, item.Fabric_type, item.EntryDate, item.SlNo, item.ComponentID, item.CompSlNo);
                            entities.Yarn_Plan_Mas.Add(item);
                            entities.SaveChanges();
                            YPID = item.YPlanmasID;
                            //var OQueryyF = entities.Yarn_Plan_Mas.Where(b => b.PlanId == PlId && b.CompSlNo == item.CompSlNo && b.SlNo == item.SlNo && b.ComponentID == item.ComponentID && b.FabricID == item.FabricID).FirstOrDefault();
                            //if (OQueryyF != null)
                            //{
                            //    YPID = OQueryyF.YPlanmasID;
                            //}
                        }
                        //detItem.SlNo =ComponentSerial No ,detItem.YSNo=Yarnpalnmasserial No 
                        foreach (var detItem in objPYDDet)
                        {
                            ComSno = detItem.SlNo;
                            if (detItem.Fabric_ColorId == item.Fabric_ColorId && detItem.FabricID == item.FabricID)
                            {
                                detItem.YPlanMasID = YPID;
                                detItem.FabricID = item.FabricID;
                                detItem.Fabric_ColorId = item.Fabric_ColorId;
                                //var PgYd = entities.Proc_Apparel_InsertConsumptionYarnPlanDet(detItem.YPlanMasID, detItem.Knit_In_ItemId, detItem.Knit_In_SizeID, detItem.Knit_in_ColorID, detItem.Knit_In_Per, detItem.Knit_In_Qty, detItem.Loss_per, detItem.Dyeing_Req, detItem.SlNo, detItem.YSNo, detItem.FabricID, detItem.Fabric_ColorId, detItem.YDSlno);
                                entities.Yarn_Plan_Det.Add(detItem);
                                entities.SaveChanges();
                                YDPID = detItem.YPlanDetID;
                                foreach (var itemL in objPYLDet)
                                {
                                    if (detItem.YSNo == itemL.FSNo)
                                    {
                                        itemL.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_ProLoss.Add(itemL);
                                    }
                                }
                                foreach (var itemDy in objPDyet)
                                {

                                    if (detItem.YDSlno == itemDy.YSNo && detItem.Dyeing_Req == true)
                                    {
                                        itemDy.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_Dyeing.Add(itemDy);
                                    }
                                }
                                entities.SaveChanges();
                            }
                        }
                    }
                    // Insert into PrgSum
                    var Pgy = entities.Proc_Apparel_GetPlanInsertYarnDetails(objYnPlan.Order_No, objYnPlan.StyleID);
                    entities.SaveChanges();
                    ////Insert into BomDet
                    var Pgy1 = entities.proc_Yarn_BOMUpdation(objYnPlan.CompanyID, objYnPlan.Order_No, objYnPlan.StyleID);
                    entities.SaveChanges();
                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PlId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "E";
                    }
                    entities.SaveChanges();
                    //var res = AmendData(objPmas, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Add", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                    //
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "PlanningConsumption-AddDetConItemData");
                }

            }
            return reserved;

        }

        public bool UpdateYarnDetData(Planning_Mas objYEAd, List<Yarn_Plan_Mas> objPYDet, List<Yarn_Plan_Det> objPYDDet, List<Yarn_Plan_ProLoss> objPYLDet, List<Yarn_Plan_Dyeing> objPDyet)
        {
            bool reserved = false;
            int OmasId = 0;
            var OrdNo = "";
            var cmpid = 0;
            var Pt = "W";
            var styId = 0;
            var PId = 0;
            var EMode = "D";
            var FType = "";
            int PlId = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {
                    //Delete Yarndet
                    var Pg4 = entities.Proc_Apparel_DeleteConsumptionYarnDetails(objYEAd.PlanID);
                    entities.SaveChanges();
                    //delete the programm summary table
                    var OQuery = entities.Planning_Mas.Where(b => b.PlanID == objYEAd.PlanID).FirstOrDefault();
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
                        OmasId = OQuery1.Buy_Ord_MasId;
                    }
                    //  Insert into PrgSum
                    var Pg = entities.Sp_ProgSum_Yarn(OrdNo, cmpid, Pt, styId, PId, EMode);
                    entities.SaveChanges();


                    //Yarn Save                    
                    foreach (var item in objPYDet)
                    {
                        if (item.Fabric_type == "KNITS")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "K")
                        {
                            FType = "K";
                        }
                        else if (item.Fabric_type == "PANELS")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "P")
                        {
                            FType = "P";
                        }
                        else if (item.Fabric_type == "WOVEN")
                        {
                            FType = "W";
                        }
                        else if (item.Fabric_type == "W")
                        {
                            FType = "W";
                        }
                        item.Fabric_type = FType;
                        item.PlanId = PId;
                        entities.Yarn_Plan_Mas.Add(item);
                        entities.SaveChanges();
                        YPID = item.YPlanmasID;
                        foreach (var detItem in objPYDDet)
                        {
                            ComSno = detItem.SlNo;
                            if (detItem.FabricID == item.FabricID && detItem.Fabric_ColorId == item.Fabric_ColorId)
                            {
                                detItem.YPlanMasID = YPID;
                                detItem.FabricID = item.FabricID;
                                detItem.Fabric_ColorId = item.Fabric_ColorId;
                                entities.Yarn_Plan_Det.Add(detItem);
                                entities.SaveChanges();
                                YDPID = detItem.YPlanDetID;
                                foreach (var itemL in objPYLDet)
                                {
                                    if (detItem.YSNo == itemL.FSNo)
                                    {
                                        itemL.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_ProLoss.Add(itemL);
                                    }
                                }
                                foreach (var itemDy in objPDyet)
                                {
                                    if (detItem.YDSlno == itemDy.YSNo && detItem.Dyeing_Req == true)
                                    {
                                        itemDy.YPlanDetID = YDPID;
                                        entities.Yarn_Plan_Dyeing.Add(itemDy);
                                    }
                                }
                            }
                            entities.SaveChanges();
                        }
                    }
                    //
                    var Pgy = entities.Proc_Apparel_GetPlanInsertYarnDetails(objYEAd.Order_No, objYEAd.StyleID);
                    entities.SaveChanges();
                    ////Insert into BomDet
                    var Pgy1 = entities.proc_Yarn_BOMUpdation(objYEAd.CompanyID, objYEAd.Order_No, objYEAd.StyleID);
                    entities.SaveChanges();
                    //Update  into Cost and Plan
                    var Pgcost = entities.Proc_Apparel_GetPlanFabricCostUpdate(objYEAd.Order_No, objYEAd.StyleID, PId);
                    entities.SaveChanges();
                    //Delete into BuyOrdDet
                    var Pg5 = entities.Proc_Apparel_GetPlanFabricDeleteBomUpdate(objYEAd.Order_No, objYEAd.StyleID, PId);
                    entities.SaveChanges();

                    //update in planning table 
                    var Plan = entities.Planning_Mas.Where(b => b.PlanID == PId).FirstOrDefault();
                    if (Plan != null)
                    {
                        Plan.Yarn_Plan = "E";
                        Plan.YarnAmend = "N";
                    }
                    //var res = AmendData(objCAd, objPCMDet, objPCDet, objPDet, objPLDet, PrgThr, "Upd", objPMas, objPDDet, objYPLDet, objPDyet);
                    //entities.SaveChanges();
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


        public IList<PlanningFabricDetails> GetConRepFabricBStockList(int FabricID, int BColorID, int GreyWidthID)
        {
            var query = (from Ecnp in entities.Proc_Apparel_GetPlanningFabricStockItemList(FabricID, BColorID, GreyWidthID)
                         select new PlanningFabricDetails
                         {

                             STransno = Ecnp.Transno,
                             SOrderno = Ecnp.Order_No,
                             SRefno = Ecnp.Ref_No,
                             SProcess = Ecnp.Process,
                             SSupplier = Ecnp.Supplier,
                             StkSlno = (int)Ecnp.SlNo,
                             StockQty = (decimal)Ecnp.StockQty,

                         }).AsQueryable();

            return query.ToList();
        }

        public IList<PlanningFabricDetails> GetConRepFabricFStockList(int FabricID, int FColorID, int FinishWidthID)
        {
            var query = (from Ecnp in entities.Proc_Apparel_GetPlanningFabricStockItemList(FabricID, FColorID, FinishWidthID)
                         select new PlanningFabricDetails
                         {

                             STransno = Ecnp.Transno,
                             SOrderno = Ecnp.Order_No,
                             SRefno = Ecnp.Ref_No,
                             SProcess = Ecnp.Process,
                             SSupplier = Ecnp.Supplier,
                             StkSlno = (int)Ecnp.SlNo,
                             StockQty = (decimal)Ecnp.StockQty,


                         }).AsQueryable();

            return query.ToList();
            //List<Domain.PlanningFabricDetails> List = new List<Domain.PlanningFabricDetails>();


            //using (SqlConnection con = new SqlConnection(connStr))
            //{
            //    SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanningStockItemList", con);
            //    cmd.CommandType = CommandType.StoredProcedure;
            //    cmd.Parameters.Add("@Itemid", SqlDbType.Int).Value = FabricID;
            //    cmd.Parameters.Add("@Sizeid", SqlDbType.Int).Value = FinishWidthID;
            //    cmd.Parameters.Add("@Colorid", SqlDbType.Int).Value = FColorID;
        
            //    con.Open();
            //    SqlDataReader rdr = cmd.ExecuteReader();
            //    while (rdr.Read())
            //    {
            //        Domain.PlanningFabricDetails obj = new Domain.PlanningFabricDetails();

            //        obj.StkSlno = Convert.ToInt32(rdr["SlNo"]);
            //        obj.STransno = rdr["Transno"].ToString();
            //        obj.SOrderno = rdr["Order_No"].ToString();
            //        obj.SRefno = rdr["Ref_No"].ToString();
            //        obj.SSupplier = rdr["Supplier"].ToString();
            //        obj.SProcess = rdr["Process"].ToString();
            //        obj.StockQty = Convert.ToDecimal(rdr["StockQty"]);
            //        obj.StockMarkUPRate = Convert.ToDecimal(rdr["Markup_Rate"]);
            //        obj.StockValue = Convert.ToDecimal(rdr["StockValue"]);
            //        obj.StockAge = Convert.ToDecimal(rdr["StockAge"]);
                
            //        List.Add(obj);
            //    }
            //    con.Close();
            //}
            //return List;
        }

        public IList<PlanningFabricDetails> LoadStockDetails(int Itemid, int Sizeid, int Colorid)
        {
            //var query = (from Ecnp in entities.Proc_Apparel_GetPlanningStockItemList(Itemid, Sizeid, Colorid)
            //             select new PlanningFabricDetails
            //             {

            //                 STransno = Ecnp.Transno,
            //                 SOrderno = Ecnp.Order_No,
            //                 SRefno = Ecnp.Ref_No,
            //                 SProcess = Ecnp.Process,
            //                 SSupplier = Ecnp.Supplier,
            //                 StkSlno = (int)Ecnp.SlNo,
            //                 StockQty = (decimal)Ecnp.StockQty,
            //                 SDespatch = Ecnp.Despatch,
            //                 SStyle = Ecnp.Style
            //             }).AsQueryable();

            //return query.ToList();

            List<Domain.PlanningFabricDetails> List = new List<Domain.PlanningFabricDetails>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanningStockItemList", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Itemid", SqlDbType.Int).Value = Itemid;
                cmd.Parameters.Add("@Sizeid", SqlDbType.Int).Value = Sizeid;
                cmd.Parameters.Add("@Colorid", SqlDbType.Int).Value = Colorid;

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningFabricDetails obj = new Domain.PlanningFabricDetails();

                    obj.StkSlno = Convert.ToInt32(rdr["SlNo"]);
                    obj.STransno = rdr["Transno"].ToString();
                    obj.SOrderno = rdr["Order_No"].ToString();
                    obj.SRefno = rdr["Ref_No"].ToString();
                    obj.SSupplier = rdr["Supplier"].ToString();
                    obj.SProcess = rdr["Process"].ToString();
                    obj.SStyle = rdr["Style"].ToString();
                    obj.SDespatch = rdr["Despatch"].ToString();
                    obj.StockQty = Convert.ToDecimal(rdr["StockQty"]);
                    obj.StockMarkUPRate = Convert.ToDecimal(rdr["Markup_Rate"]);
                    obj.StockValue = Convert.ToDecimal(rdr["StockValue"]);
                    obj.StockAge = Convert.ToDecimal(rdr["StockAge"]);
                    obj.WorkOrdNo = rdr["workOrdno"].ToString();
                    obj.SStockid = Convert.ToInt32(rdr["StockId"]);
                    obj.Fabric = rdr["Item"].ToString();
                    obj.Bcolor = rdr["Color"].ToString();
                    obj.GreyWidth = rdr["size"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }



        public IList<Domain.PlanningMain> LoadPurYarnDetails(int Planid)
        {


            List<Domain.PlanningMain> List = new List<Domain.PlanningMain>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurchaseYarnAment", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Planid", SqlDbType.Int).Value = Planid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningMain obj = new Domain.PlanningMain();

                    obj.FabricId = Convert.ToInt32(rdr["FabricId"]);
                    obj.fabric = rdr["Fabric"].ToString();
                    obj.Quantity = Convert.ToDecimal(rdr["bal"]);
                    obj.ORDQuantity = Convert.ToDecimal(rdr["Order_qty"]);

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.PlanningMain> LoadFabDetails(int Planid)
        {


            List<Domain.PlanningMain> List = new List<Domain.PlanningMain>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetfabricwiseDCQty", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Planid", SqlDbType.Int).Value = Planid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningMain obj = new Domain.PlanningMain();

                    obj.FabricId = Convert.ToInt32(rdr["FabricId"]);
                    obj.fabric = rdr["Fabric"].ToString();
                    obj.Quantity = Convert.ToDecimal(rdr["bal"]);
                    obj.ORDQuantity = Convert.ToDecimal(rdr["bal"]);
                    obj.FabricSizeid = Convert.ToInt32(rdr["GreyWidthID"]);

                    obj.FabricSize = rdr["size"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.PlanningMain> LoadFabPurDetails(int Planid)
        {


            List<Domain.PlanningMain> List = new List<Domain.PlanningMain>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurFabricAment", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Planid", SqlDbType.Int).Value = Planid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningMain obj = new Domain.PlanningMain();

                    obj.FabricId = Convert.ToInt32(rdr["FabricId"]);
                    obj.fabric = rdr["Fabric"].ToString();
                    obj.Quantity = Convert.ToDecimal(rdr["bal"]);
                    obj.ORDQuantity = Convert.ToDecimal(rdr["bal"]);
                    obj.FabricSizeid = Convert.ToInt32(rdr["sizeid"]);
                    obj.FabricColorid = Convert.ToInt32(rdr["colorid"]);
                    obj.FabricSize = rdr["size"].ToString();
                    obj.FabricColor = rdr["color"].ToString();
                    obj.PurType = rdr["Purtype"].ToString();
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

        public IList<Domain.PlanningMain> LoadYarnPOQtyDetails(int Planid)
        {


            List<Domain.PlanningMain> List = new List<Domain.PlanningMain>();


            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPurYarnDet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Planid", SqlDbType.Int).Value = Planid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningMain obj = new Domain.PlanningMain();

                    obj.FabricId = Convert.ToInt32(rdr["Knit_In_ItemId"]);
                    obj.fabric = rdr["Yarn"].ToString();
                    obj.Quantity = Convert.ToDecimal(rdr["bal"]);
                    obj.ORDQuantity = Convert.ToDecimal(rdr["bal"]);
                    obj.FabricSizeid = Convert.ToInt32(rdr["Knit_In_SizeID"]);
                    obj.FabricColorid = Convert.ToInt32(rdr["Knit_in_ColorID"]);
                    obj.FabricSize = rdr["size"].ToString();
                    obj.FabricColor = rdr["color"].ToString();

                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }


        public IList<Domain.PlanningMain> LoadAmendDetails(int Stylerowid, string jmasid, string Workordno)
        {
            List<Domain.PlanningMain> List = new List<Domain.PlanningMain>();

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanAmendDet", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Styrowid", SqlDbType.Int).Value = Stylerowid;
                cmd.Parameters.Add("@jmasid", SqlDbType.VarChar, 200).Value = jmasid;
                cmd.Parameters.Add("@WorkordNo", SqlDbType.VarChar, 25).Value = Workordno;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningMain obj = new Domain.PlanningMain();

                    obj.Order_No = rdr["Order_No"].ToString();
                    obj.Style = rdr["Style"].ToString();
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }
        public IList<Domain.PlanningMain> GetBalQty(string OrderNo, int Itemid, int Colorid, int Sizeid)
        {
            List<Domain.PlanningMain> List = new List<Domain.PlanningMain>();

            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetPlanningConBalQtyStkTrans", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ordno", SqlDbType.VarChar, 50).Value = OrderNo;
                cmd.Parameters.Add("@itemid", SqlDbType.Int).Value = Itemid;
                cmd.Parameters.Add("@colorid", SqlDbType.Int).Value = Colorid;
                cmd.Parameters.Add("@sizeid", SqlDbType.Int).Value = Sizeid;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.PlanningMain obj = new Domain.PlanningMain();

                    obj.Bal_Stk_Qty = Convert.ToDecimal(rdr["bal_qty"]);
                    obj.OrderType = rdr["OrdType"].ToString();
                    obj.Pur_UOMid = Convert.ToInt32(rdr["Pur_UOMid"]);
                    List.Add(obj);
                }
                con.Close();
            }
            return List;
        }

    }
}

