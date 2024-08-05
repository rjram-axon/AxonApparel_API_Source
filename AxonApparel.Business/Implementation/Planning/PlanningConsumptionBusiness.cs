using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
using System.Data.Entity;
using System.Data.SqlTypes;
namespace AxonApparel.Business
{
    public class PlanningConsumptionBusiness : IPlanningConsumptionBusiness
    {

        IPlanningConsumptionRepository PlanConRep = new PlanningConsumptionRepository();

        public Response<IQueryable<PlanningMain>> GetDataPlanItemDetails(int IId, int SId)
        {
            try
            {
                var ProductIm = PlanConRep.GetDataPlanItemDetails(IId, SId);

                return new Response<IQueryable<PlanningMain>>(ProductIm, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanCompDetails>> GetDataAddItemList(int CIId, int CSId, string GSID, int ClNo)
        {
            try
            {
                var ProductWO = PlanConRep.GetDataCompItemDetails(CIId, CSId, GSID, ClNo);

                return new Response<IList<PlanCompDetails>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<PlanCompDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> CreatePlanningConEntry(PlanningMain PlanConEnty)
        {
            try
            {

                string FType = "";

                AxonApparel.Repository.Planning_Mas planmasInsert = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PlanConEnty.CompanyID,
                    Buy_Ord_MasId = PlanConEnty.BMasID,
                    Order_No = PlanConEnty.Order_No,
                    StyleID = PlanConEnty.StyleID,
                    ItemID = PlanConEnty.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "N",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = PlanConEnty.PlanID,
                    PA = PlanConEnty.PA

                };


                var compList = new List<Comp_Plan_Mas>();

                foreach (var PCompItem in PlanConEnty.CompoItemMas)
                {



                    compList.Add(new Comp_Plan_Mas
                    {


                        Entry_Date = (DateTime)PlanConEnty.EDate,
                        CompSlNo = PCompItem.CompSlNo,
                        ComponentID = PCompItem.ComponentID,
                        No_Of_Parts = PCompItem.No_Of_Parts,
                        Fabric_Type = PCompItem.Fabric_TypeID,
                        Grouping = PCompItem.GroupingID,
                        Description = PCompItem.Description,
                        FabricID = PCompItem.FabricID,
                        //Comp_Plan_MasID = PCompItem.Comp_Plan_MasID,
                        PlanID = PCompItem.PlanID,
                        Unit = "C",
                        GSM = PCompItem.GSM,

                    });

                }
                //var result1 = PlanConRep.AddDetData(compList);

                //var compListDetails = new List<Con_Plan>();

                //foreach (var PCompItemDetails in PlanConEnty.PlanFabricDet)
                //{

                //    compListDetails.Add(new Con_Plan
                //    {

                //        //Con_PlanID = PCompItemDetails.Con_PlanID,
                //        CompSlNo = PCompItemDetails.CompSlNo,
                //        CPlanSlNo = PCompItemDetails.snumb,
                //        PlanID = PCompItemDetails.PlanID,
                //        ColorID = PCompItemDetails.ColorID,
                //        SizeId = PCompItemDetails.SizeId,
                //        Prdn_Qty = PCompItemDetails.Prdn_Qty,
                //        Length = PCompItemDetails.Length,
                //        Width = PCompItemDetails.Width,
                //        GSM = PCompItemDetails.GSM,
                //        Grammage = PCompItemDetails.Grammage,
                //        Weight = PCompItemDetails.ActWeight,
                //        Wmetres = PCompItemDetails.Wmetres,
                //        ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                //        GreyWidthID = PCompItemDetails.GreyWidthID,
                //        FinishWidthID = PCompItemDetails.FinishWidthID,
                //    });
                //}
                var compListDetails = new List<Con_Plan>();

                foreach (var PCompItemDetails in PlanConEnty.CompoItemDetails)
                {
                    if (PCompItemDetails.type == "KNITS" || PCompItemDetails.type == "K")
                    {
                        compListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                            PlanID = PCompItemDetails.PlanID,
                            ColorID = PCompItemDetails.ColorID,
                            SizeId = PCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                            Length = PCompItemDetails.Length,
                            Width = PCompItemDetails.Width,
                            GSM = PCompItemDetails.GSM,
                            Grammage = PCompItemDetails.Grammage,
                            Weight = PCompItemDetails.Weight,
                            Wmetres = PCompItemDetails.Wmetres,
                            ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCompItemDetails.GreyWidthID,
                            FinishWidthID = PCompItemDetails.FinishWidthID,
                            LengthAllow = PCompItemDetails.AlloLen,
                            WidthAllow = PCompItemDetails.AllowWid,
                            Pattern = PCompItemDetails.Pattern
                        });
                    }
                    else if (PCompItemDetails.type == "PANELS" || PCompItemDetails.type == "P")
                    {
                        compListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                            PlanID = PCompItemDetails.PlanID,
                            ColorID = PCompItemDetails.ColorID,
                            SizeId = PCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                            Length = PCompItemDetails.Requirement,
                            Width = PCompItemDetails.Width,
                            GSM = PCompItemDetails.WtMetre,
                            Grammage = PCompItemDetails.GmsPieces,
                            Weight = PCompItemDetails.Weight,
                            Wmetres = PCompItemDetails.TotMetres,
                            ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCompItemDetails.GreyWidthID,
                            FinishWidthID = PCompItemDetails.FinishWidthID,
                            LengthAllow = PCompItemDetails.AlloLen,
                            WidthAllow = PCompItemDetails.AllowWid,
                            Pattern = PCompItemDetails.Pattern
                        });
                    }
                    else if (PCompItemDetails.type == "WOVEN" || PCompItemDetails.type == "W")
                    {
                        compListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                            PlanID = PCompItemDetails.PlanID,
                            ColorID = PCompItemDetails.ColorID,
                            SizeId = PCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                            Length = PCompItemDetails.Requirement,
                            Width = PCompItemDetails.Width,
                            GSM = PCompItemDetails.WtMetre,
                            Grammage = PCompItemDetails.Grammage,
                            Weight = PCompItemDetails.Weight,
                            Wmetres = PCompItemDetails.TotMetres,
                            ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCompItemDetails.GreyWidthID,
                            FinishWidthID = PCompItemDetails.FinishWidthID,
                            LengthAllow = PCompItemDetails.AlloLen,
                            WidthAllow = PCompItemDetails.AllowWid,
                            Pattern = PCompItemDetails.Pattern
                        });
                    }
                }
                //Fabric Details
                var compFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PlanConEnty.PlanFabricDet)
                {



                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }

                    if (PFabItem.type == "KNITS" || PFabItem.FabricType == "K")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = 0,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = "K",//PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PlanConEnty.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.type == "PANELS" || PFabItem.FabricType == "P")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Woven_Req_InMtrs,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Weight,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = "P",////PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PlanConEnty.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.type == "WOVEN" || PFabItem.FabricType == "W")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Woven_Req_InMtrs,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Weight,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = "W",//PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PlanConEnty.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                }

                var compFabLossList = new List<Fab_Plan_ProLoss>();
                if (PlanConEnty.PlanLoss != null)
                {
                    foreach (var PFabLossItem in PlanConEnty.PlanLoss)
                    {

                        compFabLossList.Add(new Fab_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PFabLossItem.SlNo,
                            ProcessId = PFabLossItem.ProcessId,
                            Loss_Per = PFabLossItem.Loss_Per,
                            CompSlNo = PFabLossItem.CompSNo,
                            GColorId = PFabLossItem.FLGColorID,


                        });

                    }
                }


                //Yarn Details

                //SlNo =YarnMasSerial No,CompSlNo=ComponentSerial No

                var compYarnList = new List<Yarn_Plan_Mas>();

                if (PlanConEnty.PlanYarnN != null)
                {


                    foreach (var PYarnItem in PlanConEnty.PlanYarnN)
                    {

                        if (PYarnItem.Fabric_type == "WOVEN")
                        {
                            FType = "W";
                        }
                        else if (PYarnItem.Fabric_type == "PANELS")
                        {
                            FType = "P";
                        }
                        else if (PYarnItem.Fabric_type == "KNITS")
                        {
                            FType = "K";
                        }
                        else
                        {
                            FType = PYarnItem.Fabric_type;
                        }
                        compYarnList.Add(new Yarn_Plan_Mas
                        {

                            //YPlanmasID = PYarnItem.YPlanmasID,
                            PlanId = PYarnItem.PlanId,
                            FabricID = PYarnItem.FabricID,
                            Fabric_ColorId = PYarnItem.Fabric_ColorId,
                            Fabric_Weight = PYarnItem.Fabric_Weight,
                            Fabric_type = FType,//PYarnItem.Fabric_type,
                            EntryDate = PlanConEnty.EDate,
                            SlNo = PYarnItem.YSlno,
                            CompSlNo = PYarnItem.SlNo,
                            ComponentID = PYarnItem.ComponentId,

                        });

                    }
                }


                //SlNo =ComponentSerial No ,YSNo=Yarnpalnmasserial No 

                var compYarnDetList = new List<Yarn_Plan_Det>();
                if (PlanConEnty.PlanYarnDet != null)
                {
                    foreach (var PYarnDetItem in PlanConEnty.PlanYarnDet)
                    {


                        compYarnDetList.Add(new Yarn_Plan_Det
                        {


                            //YPlanDetID = PYarnDetItem.YplanDetID,
                            //YPlanMasID = PYarnDetItem.YPlanMasID,
                            Knit_In_ItemId = PYarnDetItem.Knit_In_ItemId,
                            Knit_In_SizeID = PYarnDetItem.Knit_In_SizeID,
                            Knit_in_ColorID = PYarnDetItem.Knit_in_ColorID,
                            Knit_In_Per = PYarnDetItem.Knit_In_Per,
                            Knit_In_Qty = PYarnDetItem.Knit_In_Qty,
                            Loss_per = PYarnDetItem.Loss_per,
                            Dyeing_Req = PYarnDetItem.Dyeing_Req,
                            SlNo = PYarnDetItem.CompSno,
                            YSNo = PYarnDetItem.YSlNo,
                            Fabric_ColorId = PYarnDetItem.BaseColorID,
                            FabricID = PYarnDetItem.FabricID,
                            YDSlno = PYarnDetItem.SlNo

                        });

                    }
                }


                //loss
                var compyarnLossList = new List<Yarn_Plan_ProLoss>();
                if (PlanConEnty.PlanYarnLoss != null)
                {
                    foreach (var PYarnLossItem in PlanConEnty.PlanYarnLoss)
                    {

                        compyarnLossList.Add(new Yarn_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnLossItem.SlNo,
                            ProcessId = PYarnLossItem.ProcessId,
                            Loss_Per = PYarnLossItem.Loss_Per,
                            FSNo = PYarnLossItem.SNo,
                            CompSNo = PYarnLossItem.CompSNo,


                        });

                    }
                }


                //Dyeing
                var compyarndyeList = new List<Yarn_Plan_Dyeing>();
                if (PlanConEnty.PlanYarnDyeing != null)
                {
                    foreach (var PYarnDyeItem in PlanConEnty.PlanYarnDyeing)
                    {

                        compyarndyeList.Add(new Yarn_Plan_Dyeing
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnDyeItem.SlNo,
                            Garment_ColorID = PYarnDyeItem.Garment_ColorID,
                            GWeight = PYarnDyeItem.GWeight,
                            Yarn_DyeColorID = PYarnDyeItem.Yarn_DyeColorID,
                            Qty_Per = PYarnDyeItem.Qty_Per,
                            Weight = PYarnDyeItem.Weight,
                            Purchase_Qty = PYarnDyeItem.Purchase_Qty,
                            Courses = PYarnDyeItem.Courses,
                            CompSlNo = PYarnDyeItem.CompSlNo,
                            YSNo = PYarnDyeItem.YDSlNo

                        });

                    }
                }


                var result = PlanConRep.AddDetConItemData(planmasInsert, compList, compListDetails, compFabList, compFabLossList, PlanConEnty.PrgThr, PlanConEnty.Mode, compYarnList, compYarnDetList, compyarnLossList, compyarndyeList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanComponent>> GetComplanList(int ItemId, int StyleRowId, int PlanID)
        {
            try
            {
                var CurDetList = PlanConRep.GetRepCompDetList(ItemId, StyleRowId, PlanID);

                return new Response<IList<PlanComponent>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanComponent>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanCompDetails>> GetConsumpplanList(int ItemId, int StyleRowId, int CompSNo, int PlanID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetRepConDetList(ItemId, StyleRowId, CompSNo, PlanID);

                return new Response<IList<PlanCompDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanCompDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> UpdateConEntry(PlanningMain PEntry)
        {

            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PEntry.CompanyID,
                    Buy_Ord_MasId = PEntry.BMasID,
                    Order_No = PEntry.Order_No,
                    StyleID = PEntry.StyleID,
                    ItemID = PEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "E",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = PEntry.PlanID,
                    PA = PEntry.PA

                };



                var compList = new List<Comp_Plan_Mas>();

                foreach (var PCompItem in PEntry.CompoItemMas)
                {

                    if (PCompItem.Grouping == "COLOR/SIZE")
                    {
                        Group = "CS";
                    }
                    else if (PCompItem.Grouping == "SIZE")
                    {
                        Group = "S";
                    }
                    else if (PCompItem.Grouping == "COLOR")
                    {
                        Group = "C";
                    }
                    else
                    {
                        Group = "A";
                    }

                    compList.Add(new Comp_Plan_Mas
                    {


                        Entry_Date = PEntry.EDate,
                        CompSlNo = PCompItem.CompSlNo,
                        ComponentID = PCompItem.ComponentID,
                        No_Of_Parts = PCompItem.No_Of_Parts,
                        Fabric_Type = PCompItem.Fabric_TypeID,
                        Grouping = Group,
                        Description = PCompItem.Description,
                        FabricID = PCompItem.FabricID,
                        //Comp_Plan_MasID = PCompItem.Comp_Plan_MasID,
                        PlanID = PCompItem.PlanID,
                        Unit = "C",
                        GSM = PCompItem.GSM,

                    });

                }

                var compListDetails = new List<Con_Plan>();

                foreach (var PCompItemDetails in PEntry.CompoItemDetails)
                {

                    //compListDetails.Add(new Con_Plan
                    //{

                    //    CompSlNo = PCompItemDetails.CompSlNo,
                    //    CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                    //    PlanID = PCompItemDetails.PlanID,
                    //    ColorID = PCompItemDetails.ColorID,
                    //    SizeId = PCompItemDetails.SizeId,
                    //    Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                    //    Length = PCompItemDetails.Length,
                    //    Width = PCompItemDetails.Width,
                    //    GSM = PCompItemDetails.GSM,
                    //    Grammage = PCompItemDetails.Grammage,
                    //    Weight = PCompItemDetails.Weight,
                    //    Wmetres = PCompItemDetails.Wmetres,
                    //    ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                    //    GreyWidthID = PCompItemDetails.GreyWidthID,
                    //    FinishWidthID = PCompItemDetails.FinishWidthID,
                    //});


                    if (PCompItemDetails.type == "KNITS" || PCompItemDetails.type == "K")
                    {
                        compListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                            PlanID = PCompItemDetails.PlanID,
                            ColorID = PCompItemDetails.ColorID,
                            SizeId = PCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                            Length = PCompItemDetails.Length,
                            Width = PCompItemDetails.Width,
                            GSM = PCompItemDetails.GSM,
                            Grammage = PCompItemDetails.Grammage,
                            Weight = PCompItemDetails.Weight,
                            Wmetres = PCompItemDetails.Wmetres,
                            ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCompItemDetails.GreyWidthID,
                            FinishWidthID = PCompItemDetails.FinishWidthID,
                            LengthAllow = PCompItemDetails.AlloLen,
                            WidthAllow = PCompItemDetails.AllowWid,
                            Pattern = PCompItemDetails.Pattern
                        });
                    }
                    else if (PCompItemDetails.type == "PANELS" || PCompItemDetails.type == "P")
                    {
                        compListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                            PlanID = PCompItemDetails.PlanID,
                            ColorID = PCompItemDetails.ColorID,
                            SizeId = PCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                            Length = PCompItemDetails.Requirement,
                            Width = PCompItemDetails.Width,
                            GSM = PCompItemDetails.WtMetre,
                            Grammage = PCompItemDetails.GmsPieces,
                            Weight = PCompItemDetails.Weight,
                            Wmetres = PCompItemDetails.TotMetres,
                            ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCompItemDetails.GreyWidthID,
                            FinishWidthID = PCompItemDetails.FinishWidthID,
                            LengthAllow = PCompItemDetails.AlloLen,
                            WidthAllow = PCompItemDetails.AllowWid,
                            Pattern = PCompItemDetails.Pattern
                        });
                    }
                    else if (PCompItemDetails.type == "WOVEN" || PCompItemDetails.type == "W")
                    {
                        compListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCompItemDetails.CPlanSlNo,
                            PlanID = PCompItemDetails.PlanID,
                            ColorID = PCompItemDetails.ColorID,
                            SizeId = PCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCompItemDetails.Prdn_Qty,
                            Length = PCompItemDetails.Requirement,
                            Width = PCompItemDetails.Width,
                            GSM = PCompItemDetails.WtMetre,
                            Grammage = PCompItemDetails.Grammage,
                            Weight = PCompItemDetails.Weight,
                            Wmetres = PCompItemDetails.TotMetres,
                            ActualFabricWidth = PCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCompItemDetails.GreyWidthID,
                            FinishWidthID = PCompItemDetails.FinishWidthID,
                            LengthAllow = PCompItemDetails.AlloLen,
                            WidthAllow = PCompItemDetails.AllowWid,
                            Pattern = PCompItemDetails.Pattern
                        });
                    }
                }

                //Fabric Details
                var compFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PEntry.PlanFabricDet)
                {



                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }

                    //compFabList.Add(new Fabric_Plan
                    //{


                    //    //FPlanId=PFabIte
                    //    CompSlNo = PFabItem.CompSlNo,
                    //    PlanID = PFabItem.PlanID,
                    //    ColorID = PFabItem.ColorID,
                    //    SizeId = PFabItem.SizeId,
                    //    Prdn_Qty = PFabItem.Prdn_Qty,
                    //    Fabric_Req = PFabItem.Weight,
                    //    Grammage = PFabItem.Grammage,
                    //    Woven_Req_InMtrs = 0,
                    //    LossGain = 0,//PFabItem.CompSlNo,
                    //    FabricId = PFabItem.FabricID,
                    //    Fabric_type = PFabItem.FabricType,
                    //    Fab_WidthId = PFabItem.GreyWidthID,
                    //    Table_WidthID = PFabItem.FinishWidthID,
                    //    BaseColorID = PFabItem.BColorID,
                    //    BColorPur_Qty = PFabItem.BColorPQty,
                    //    FinishColorID = PFabItem.FColorID,
                    //    FColorPur_Qty = PFabItem.FColorPQty,
                    //    PrintColorId = PID,//PFabItem.PColorID,
                    //    EntryDate = PEntry.EDate,
                    //    //Knit_GSM=PFabItem,
                    //    Fin_GSM = PFabItem.FGsm,
                    //    //Loop_Len=PFabItem.CompSlNo,
                    //    //Texture=PFabItem.CompSlNo,
                    //    //Content = PFabItem.CompSlNo,
                    //    Gauge = "",

                    //});
                    if (PFabItem.FabricType == "KNITS" || PFabItem.FabricType == "K")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = 0,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PEntry.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.FabricType == "PANELS" || PFabItem.FabricType == "P")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Woven_Req_InMtrs,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Weight,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PEntry.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.FabricType == "WOVEN" || PFabItem.FabricType == "W")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Woven_Req_InMtrs,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Weight,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PEntry.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }


                }

                var compFabLossList = new List<Fab_Plan_ProLoss>();
                if (PEntry.PlanLoss != null)
                {
                    foreach (var PFabLossItem in PEntry.PlanLoss)
                    {

                        compFabLossList.Add(new Fab_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PFabLossItem.SlNo,
                            ProcessId = PFabLossItem.ProcessId,
                            Loss_Per = PFabLossItem.Loss_Per,
                            CompSlNo = PFabLossItem.CompSNo,
                            FPlanId = PFabLossItem.FPlanId,
                            GColorId=PFabLossItem.FLGColorID,




                        });

                    }
                }


                //Yarn Details

                var compYarnList = new List<Yarn_Plan_Mas>();
                if (PEntry.PlanYarnN != null)
                {
                    foreach (var PYarnItem in PEntry.PlanYarnN)
                    {

                        compYarnList.Add(new Yarn_Plan_Mas
                        {

                            //YPlanmasID = PYarnItem.YPlanmasID,
                            PlanId = PYarnItem.PlanId,
                            FabricID = PYarnItem.FabricID,
                            Fabric_ColorId = PYarnItem.Fabric_ColorId,
                            Fabric_Weight = PYarnItem.Fabric_Weight,
                            Fabric_type = PYarnItem.Fabric_type,
                            EntryDate = PEntry.EDate,
                            SlNo = PYarnItem.YSlno,
                            CompSlNo = PYarnItem.SlNo,
                            ComponentID = PYarnItem.ComponentId,

                        });

                    }
                }
                var compYarnDetList = new List<Yarn_Plan_Det>();
                if (PEntry.PlanYarnDet != null)
                {
                    foreach (var PYarnDetItem in PEntry.PlanYarnDet)
                    {


                        compYarnDetList.Add(new Yarn_Plan_Det
                        {



                            //YPlanDetID = PYarnDetItem.YplanDetID,
                            //YPlanMasID = PYarnDetItem.YPlanMasID,
                            Knit_In_ItemId = PYarnDetItem.Knit_In_ItemId,
                            Knit_In_SizeID = PYarnDetItem.Knit_In_SizeID,
                            Knit_in_ColorID = PYarnDetItem.Knit_in_ColorID,
                            Knit_In_Per = PYarnDetItem.Knit_In_Per,
                            Knit_In_Qty = PYarnDetItem.Knit_In_Qty,
                            Loss_per = PYarnDetItem.Loss_per,
                            Dyeing_Req = PYarnDetItem.Dyeing_Req,
                            YDSlno = PYarnDetItem.SlNo,
                            SlNo = PYarnDetItem.CompSno,
                            YSNo = PYarnDetItem.YSlNo,
                            Fabric_ColorId = PYarnDetItem.BaseColorID,
                            FabricID = PYarnDetItem.FabricID,

                        });

                    }
                }


                //loss
                var compyarnLossList = new List<Yarn_Plan_ProLoss>();
                if (PEntry.PlanYarnLoss != null)
                {
                    foreach (var PYarnLossItem in PEntry.PlanYarnLoss)
                    {

                        compyarnLossList.Add(new Yarn_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnLossItem.SlNo,
                            ProcessId = PYarnLossItem.ProcessId,
                            Loss_Per = PYarnLossItem.Loss_Per,
                            FSNo = PYarnLossItem.SNo,
                            CompSNo = PYarnLossItem.CompSNo,




                        });

                    }
                }


                //Dyeing
                var compyarndyeList = new List<Yarn_Plan_Dyeing>();
                if (PEntry.PlanYarnDyeing != null)
                {
                    foreach (var PYarnDyeItem in PEntry.PlanYarnDyeing)
                    {

                        compyarndyeList.Add(new Yarn_Plan_Dyeing
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnDyeItem.SlNo,
                            Garment_ColorID = PYarnDyeItem.Garment_ColorID,
                            GWeight = PYarnDyeItem.GWeight,
                            Yarn_DyeColorID = PYarnDyeItem.Yarn_DyeColorID,
                            Qty_Per = PYarnDyeItem.Qty_Per,
                            Weight = PYarnDyeItem.Weight,
                            Purchase_Qty = PYarnDyeItem.Purchase_Qty,
                            Courses = PYarnDyeItem.Courses,
                            YSNo = PYarnDyeItem.YDSlNo,
                            CompSlNo = PYarnDyeItem.CompSlNo,


                        });

                    }
                }


                var result = PlanConRep.UpdateConDetData(planmasEdit, compList, compListDetails, compFabList, compFabLossList, PEntry.PrgThr, PEntry.Mode, compYarnList, compYarnDetList, compyarnLossList, compyarndyeList);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }



        public Response<IList<PlanCompDetails>> GetConsumpplanTotList(int Itemid, int StyleRowId, int PlanID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetRepConDetTotList(Itemid, StyleRowId, PlanID);

                return new Response<IList<PlanCompDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanCompDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanCompDetails>> GetFabricList()
        {
            try
            {
                var CurConDetList = PlanConRep.Getfabricdet();

                return new Response<IQueryable<PlanCompDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IQueryable<PlanCompDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningFabricDetails>> GetDataComFabricDetList(int Itemid, int StyleRowId, int CompSNo)
        {
            try
            {
                var CurConDetList = PlanConRep.GetCompFabricPlanList(Itemid, StyleRowId, CompSNo);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanLoss>> GetDataPlanFabricLossList(int PLID, int CMID)
        {
            try
            {
                var PlFab = PlanConRep.GetCompDetFabricLossDetails(PLID, CMID);

                return new Response<IList<PlanLoss>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanLoss>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanningFabricDetails>> GetConFabricplantotList(int PID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetConFabricPlantotList(PID);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanningYarn>> GetDataPlanYarnList(int PLID)
        {
            try
            {
                var PlFabY = PlanConRep.GetFabricItemDetails(PLID);

                return new Response<IList<PlanningYarn>>(PlFabY, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //edit yarn det details
        public Response<IList<PlanningYarnDet>> GetDataPlanYarnEditList(int PLID)
        {
            try
            {
                var PlE = PlanConRep.GetEditYarnDetDetails(PLID);

                return new Response<IList<PlanningYarnDet>>(PlE, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Bom>> GetPoEntryCheckItemDetails(string OrdNo, int StyId)
        {
            try
            {
                var ProductEWO = PlanConRep.GetDataRepCheckPoDetails(OrdNo, StyId);

                return new Response<IList<Bom>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningYarnDyeing>> GetDataPlanDyeDetList(int StyleRowId, int ItemId, int BColorId, int FabricId, int ComponentId, int YDSlNo)
        {
            try
            {
                var PlFabYd = PlanConRep.GetDyeingItemDetails(StyleRowId, ItemId, BColorId, FabricId, ComponentId, YDSlNo);

                return new Response<IList<PlanningYarnDyeing>>(PlFabYd, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnDyeing>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningYarnDyeing>> GetYarnDyeingplanList(int PlId, int ItemID, int FabricID, int StyleRowID)
        {
            try
            {
                var PlD = PlanConRep.GetYarnDyeingRepList(PlId, ItemID, FabricID, StyleRowID);

                return new Response<IList<PlanningYarnDyeing>>(PlD, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningYarnDyeing>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningYarnLoss>> GetDataPlanYarnLossList(int PID)
        {
            try
            {
                var PlY = PlanConRep.GetCompDetYarnLossDetails(PID);

                return new Response<IList<PlanningYarnLoss>>(PlY, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnLoss>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<ProdPrgMas>> GetPrgEntryCheckItemDetails(int StyRowId)
        {
            try
            {
                var ProductEWO = PlanConRep.GetDataRepCheckPrgDetails(StyRowId);

                return new Response<IList<ProdPrgMas>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<ProdPrgMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanningMain>> GetStyleNo(string orderno)
        {
            try
            {
                var ProductIm = PlanConRep.GetStyleNo(orderno);

                return new Response<IQueryable<PlanningMain>>(ProductIm, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IQueryable<PlanningMain>> FabRequirementRpt(int compid, int buyerid, string ordno, int styleid, string fromdate, string todate)
        {
            try
            {
                var ProductIm = PlanConRep.FabRequirementRpt(compid, buyerid, ordno, styleid, fromdate, todate);

                return new Response<IQueryable<PlanningMain>>(ProductIm, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanningMain>> PlanningRpt(int compid, int buyerid, string ordno, int styleid, string ordtype, string buyrefno, string itmtype,string DtType, string fromdate, string todate)
        {
            try
            {
                var ProductIm = PlanConRep.PlanningRpt(compid, buyerid, ordno, styleid, ordtype, buyrefno, itmtype, DtType, fromdate, todate);

                return new Response<IQueryable<PlanningMain>>(ProductIm, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanningMain>> DetailCostingRpt(int compid, int buyerid, int seasonid, int itmgrpid, string ordno, int styleid, string ordtype, string refno, string wrkord, string itmtype, string fromdate, string todate)
        {
            try
            {
                var ProductIm = PlanConRep.DetailCostingRpt(compid, buyerid, seasonid, itmgrpid, ordno, styleid, ordtype, refno, wrkord, itmtype, fromdate, todate);

                return new Response<IQueryable<PlanningMain>>(ProductIm, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Bom>> GetPoEntryIndCheckItemDetails(string OrdNo, int StyId, int ItmId, int ColorId, int SizeId)
        {
            try
            {
                var ProductEWO = PlanConRep.GetDataRepCheckPoIndDetails(OrdNo, StyId, ItmId, ColorId, SizeId);

                return new Response<IList<Bom>>(ProductEWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Bom>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePrintEntry(PlanningMain PlanPrintEnty)
        {
            try
            {

                AxonApparel.Repository.User_Print_Log planprintadd = new AxonApparel.Repository.User_Print_Log
                {
                    UserID = PlanPrintEnty.CreatedBy,
                    EntryNo = "",
                    ModuleName = PlanPrintEnty.DocumentNo,
                    DocumentName = PlanPrintEnty.DocumentNo,
                    MachineIP = "",
                    MachineName = "",

                };


                var result = PlanConRep.PrintAdd(planprintadd, PlanPrintEnty.StyleRowid);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }

        }


        public Response<IQueryable<PlanningMain>> GetPrintCheck(int Id)
        {
            try
            {
                var ProductWO = PlanConRep.GetDataPrintCheckDetails(Id);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PlanningMain>> LoadProcess(int GItemId, int StyRowId, string BmasId)
        {
            try
            {
                var ProductWO = PlanConRep.LoadProcess(GItemId, StyRowId, BmasId);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PlanningMain>> LoadYarn(int GItemId, int StyRowId, string BmasId)
        {
            try
            {
                var ProductWO = PlanConRep.LoadYarn(GItemId, StyRowId, BmasId);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PlanningMain>> LoadFabric(int GItemId, int StyRowId, string BmasId)
        {
            try
            {
                var ProductWO = PlanConRep.LoadFabric(GItemId, StyRowId, BmasId);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IQueryable<Domain.OrdCons_Mas>> GetMeasureName(int GItemId, int StyRowId, int BmasId)
        {
            try
            {
                var ProductWO = PlanConRep.LoadMeasRepFabric(GItemId, StyRowId, BmasId);

                return new Response<IQueryable<Domain.OrdCons_Mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.OrdCons_Mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanCompDetails>> GetCopyConsumpplanTotList(int Itemid, int StyleRowId, int PlanID, int CopyStyRowID, int CopyItemID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetRepCopyConDetTotList(Itemid, StyleRowId, PlanID, CopyStyRowID, CopyItemID);

                return new Response<IList<PlanCompDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanCompDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanningFabricDetails>> GetConCopyFabricplantotList(int PID, int CopyStyRowID, int CopyItemID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetConCopyFabricPlantotList(PID, CopyStyRowID, CopyItemID);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningYarn>> GetDataPlanCopyYarnList(int PID, int CopyStyRowID, int CopyItemID)
        {
            try
            {
                var PlFabY = PlanConRep.GetFabricCopyItemDetails(PID, CopyStyRowID, CopyItemID);

                return new Response<IList<PlanningYarn>>(PlFabY, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanningYarnDet>> GetDataPlanCopyYarnEditList(int PID, int CopyStyRowID, int CopyItemID)
        {
            try
            {
                var PlE = PlanConRep.GetEditCopyYarnDetDetails(PID, CopyStyRowID, CopyItemID);

                return new Response<IList<PlanningYarnDet>>(PlE, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PlanningMain>> LoadBusCopyOrder(string OrderNo)
        {
            try
            {
                var ProductWO = PlanConRep.LoadCopyOrder(OrderNo);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePlanningConDetEntry(PlanningMain PlanConDetEnty)
        {
            try
            {

                string FType = "";

                AxonApparel.Repository.Planning_Mas planconmasInsert = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PlanConDetEnty.CompanyID,
                    Buy_Ord_MasId = PlanConDetEnty.BMasID,
                    Order_No = PlanConDetEnty.Order_No,
                    StyleID = PlanConDetEnty.StyleID,
                    ItemID = PlanConDetEnty.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "N",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = PlanConDetEnty.PlanID,
                    PA = PlanConDetEnty.PA,
                    CreatedBy = PlanConDetEnty.CreatedBy,

                };


                var ccompList = new List<Comp_Plan_Mas>();

                foreach (var PCompDetItem in PlanConDetEnty.CompoItemMas)
                {



                    ccompList.Add(new Comp_Plan_Mas
                    {


                        Entry_Date = (DateTime)PlanConDetEnty.EDate,
                        CompSlNo = PCompDetItem.CompSlNo,
                        ComponentID = PCompDetItem.ComponentID,
                        No_Of_Parts = PCompDetItem.No_Of_Parts,
                        Fabric_Type = PCompDetItem.Fabric_TypeID,
                        Grouping = PCompDetItem.GroupingID,
                        Description = PCompDetItem.Description,
                        FabricID = PCompDetItem.FabricID,
                        //Comp_Plan_MasID = PCompItem.Comp_Plan_MasID,
                        PlanID = PCompDetItem.PlanID,
                        Unit = "C",
                        GSM = PCompDetItem.GSM,

                    });

                }

                var ccompListDetails = new List<Con_Plan>();

                foreach (var PCCompItemDetails in PlanConDetEnty.CompoItemDetails)
                {
                    if (PCCompItemDetails.type == "KNITS" || PCCompItemDetails.type == "K")
                    {
                        ccompListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCCompItemDetails.CPlanSlNo,
                            PlanID = PCCompItemDetails.PlanID,
                            ColorID = PCCompItemDetails.ColorID,
                            SizeId = PCCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCCompItemDetails.Prdn_Qty,
                            Length = PCCompItemDetails.Length,
                            Width = PCCompItemDetails.Width,
                            GSM = PCCompItemDetails.GSM,
                            Grammage = PCCompItemDetails.Grammage,
                            Weight = PCCompItemDetails.Weight,
                            Wmetres = PCCompItemDetails.Wmetres,
                            ActualFabricWidth = PCCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCCompItemDetails.GreyWidthID,
                            FinishWidthID = PCCompItemDetails.FinishWidthID,
                            LengthAllow = PCCompItemDetails.AlloLen,
                            WidthAllow = PCCompItemDetails.AllowWid,
                            Pattern = PCCompItemDetails.Pattern
                        });
                    }
                    else if (PCCompItemDetails.type == "PANELS" || PCCompItemDetails.type == "P")
                    {
                        ccompListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCCompItemDetails.CPlanSlNo,
                            PlanID = PCCompItemDetails.PlanID,
                            ColorID = PCCompItemDetails.ColorID,
                            SizeId = PCCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCCompItemDetails.Prdn_Qty,
                            Length = PCCompItemDetails.Requirement,
                            Width = PCCompItemDetails.Width,
                            GSM = PCCompItemDetails.WtMetre,
                            Grammage = PCCompItemDetails.GmsPieces,
                            Weight = PCCompItemDetails.Weight,
                            Wmetres = PCCompItemDetails.TotMetres,
                            ActualFabricWidth = PCCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCCompItemDetails.GreyWidthID,
                            FinishWidthID = PCCompItemDetails.FinishWidthID,
                            LengthAllow = PCCompItemDetails.AlloLen,
                            WidthAllow = PCCompItemDetails.AllowWid,
                            Pattern = PCCompItemDetails.Pattern
                        });
                    }
                    else if (PCCompItemDetails.type == "WOVEN" || PCCompItemDetails.type == "W")
                    {
                        ccompListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PCCompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PCCompItemDetails.CPlanSlNo,
                            PlanID = PCCompItemDetails.PlanID,
                            ColorID = PCCompItemDetails.ColorID,
                            SizeId = PCCompItemDetails.SizeId,
                            Prdn_Qty = (int)PCCompItemDetails.Prdn_Qty,
                            Length = PCCompItemDetails.Requirement,
                            Width = PCCompItemDetails.Width,
                            GSM = PCCompItemDetails.WtMetre,
                            Grammage = PCCompItemDetails.Grammage,
                            Weight = PCCompItemDetails.Weight,
                            Wmetres = PCCompItemDetails.TotMetres,
                            ActualFabricWidth = PCCompItemDetails.ActualFabricWidth,
                            GreyWidthID = PCCompItemDetails.GreyWidthID,
                            FinishWidthID = PCCompItemDetails.FinishWidthID,
                            LengthAllow = PCCompItemDetails.AlloLen,
                            WidthAllow = PCCompItemDetails.AllowWid,
                            Pattern = PCCompItemDetails.Pattern
                        });
                    }
                }


                var result = PlanConRep.AddDetConsumDetItemData(planconmasInsert, ccompList, ccompListDetails, PlanConDetEnty.PrgThr, PlanConDetEnty.Mode);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateConDetEntry(PlanningMain PConEntry)
        {
            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasConEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PConEntry.CompanyID,
                    Buy_Ord_MasId = PConEntry.BMasID,
                    Order_No = PConEntry.Order_No,
                    StyleID = PConEntry.StyleID,
                    ItemID = PConEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "N",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = PConEntry.PlanID,
                    PA = PConEntry.PA,
                    CreatedBy = PConEntry.CreatedBy,

                };



                var eccompList = new List<Comp_Plan_Mas>();

                foreach (var PECompItem in PConEntry.CompoItemMas)
                {

                    if (PECompItem.Grouping == "COLOR/SIZE")
                    {
                        Group = "CS";
                    }
                    else if (PECompItem.Grouping == "SIZE")
                    {
                        Group = "S";
                    }
                    else if (PECompItem.Grouping == "COLOR")
                    {
                        Group = "C";
                    }
                    else
                    {
                        Group = "A";
                    }

                    eccompList.Add(new Comp_Plan_Mas
                    {


                        Entry_Date = PConEntry.EDate,
                        CompSlNo = PECompItem.CompSlNo,
                        ComponentID = PECompItem.ComponentID,
                        No_Of_Parts = PECompItem.No_Of_Parts,
                        Fabric_Type = PECompItem.Fabric_TypeID,
                        Grouping = Group,
                        Description = PECompItem.Description,
                        FabricID = PECompItem.FabricID,
                        //Comp_Plan_MasID = PCompItem.Comp_Plan_MasID,
                        PlanID = PECompItem.PlanID,
                        Unit = "C",
                        GSM = PECompItem.GSM,

                    });

                }

                var eccompListDetails = new List<Con_Plan>();

                foreach (var PECompItemDetails in PConEntry.CompoItemDetails)
                {



                    if (PECompItemDetails.type == "KNITS" || PECompItemDetails.type == "K")
                    {
                        eccompListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PECompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PECompItemDetails.CPlanSlNo,
                            PlanID = PECompItemDetails.PlanID,
                            ColorID = PECompItemDetails.ColorID,
                            SizeId = PECompItemDetails.SizeId,
                            Prdn_Qty = (int)PECompItemDetails.Prdn_Qty,
                            Length = PECompItemDetails.Length,
                            Width = PECompItemDetails.Width,
                            GSM = PECompItemDetails.GSM,
                            Grammage = PECompItemDetails.Grammage,
                            Weight = PECompItemDetails.Weight,
                            Wmetres = PECompItemDetails.Wmetres,
                            ActualFabricWidth = PECompItemDetails.ActualFabricWidth,
                            GreyWidthID = PECompItemDetails.GreyWidthID,
                            FinishWidthID = PECompItemDetails.FinishWidthID,
                            LengthAllow = PECompItemDetails.AlloLen,
                            WidthAllow = PECompItemDetails.AllowWid,
                            Pattern = PECompItemDetails.Pattern
                        });
                    }
                    else if (PECompItemDetails.type == "PANELS" || PECompItemDetails.type == "P")
                    {
                        eccompListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PECompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PECompItemDetails.CPlanSlNo,
                            PlanID = PECompItemDetails.PlanID,
                            ColorID = PECompItemDetails.ColorID,
                            SizeId = PECompItemDetails.SizeId,
                            Prdn_Qty = (int)PECompItemDetails.Prdn_Qty,
                            Length = PECompItemDetails.Requirement,
                            Width = PECompItemDetails.Width,
                            GSM = PECompItemDetails.WtMetre,
                            Grammage = PECompItemDetails.GmsPieces,
                            Weight = PECompItemDetails.Weight,
                            Wmetres = PECompItemDetails.TotMetres,
                            ActualFabricWidth = PECompItemDetails.ActualFabricWidth,
                            GreyWidthID = PECompItemDetails.GreyWidthID,
                            FinishWidthID = PECompItemDetails.FinishWidthID,
                            LengthAllow = PECompItemDetails.AlloLen,
                            WidthAllow = PECompItemDetails.AllowWid,
                            Pattern = PECompItemDetails.Pattern
                        });
                    }
                    else if (PECompItemDetails.type == "WOVEN" || PECompItemDetails.type == "W")
                    {
                        eccompListDetails.Add(new Con_Plan
                        {

                            CompSlNo = PECompItemDetails.CompSlNo,
                            CPlanSlNo = (int)PECompItemDetails.CPlanSlNo,
                            PlanID = PECompItemDetails.PlanID,
                            ColorID = PECompItemDetails.ColorID,
                            SizeId = PECompItemDetails.SizeId,
                            Prdn_Qty = (int)PECompItemDetails.Prdn_Qty,
                            Length = PECompItemDetails.Requirement,
                            Width = PECompItemDetails.Width,
                            GSM = PECompItemDetails.WtMetre,
                            Grammage = PECompItemDetails.Grammage,
                            Weight = PECompItemDetails.Weight,
                            Wmetres = PECompItemDetails.TotMetres,
                            ActualFabricWidth = PECompItemDetails.ActualFabricWidth,
                            GreyWidthID = PECompItemDetails.GreyWidthID,
                            FinishWidthID = PECompItemDetails.FinishWidthID,
                            LengthAllow = PECompItemDetails.AlloLen,
                            WidthAllow = PECompItemDetails.AllowWid,
                            Pattern = PECompItemDetails.Pattern
                        });
                    }
                }

                var result = PlanConRep.UpdateConSumDetData(planmasConEdit, eccompList, eccompListDetails, PConEntry.PrgThr, PConEntry.Mode);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }

        }


        public Response<bool> CreatePlanningFabDetEntry(PlanningMain FabConDetEnty)
        {
            try
            {

                AxonApparel.Repository.Planning_Mas planmasFabInsert = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = FabConDetEnty.CompanyID,
                    Buy_Ord_MasId = FabConDetEnty.BMasID,
                    Order_No = FabConDetEnty.Order_No,
                    StyleID = FabConDetEnty.StyleID,
                    ItemID = FabConDetEnty.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = FabConDetEnty.PlanID,
                    PA = FabConDetEnty.PA

                };
                
                //Fabric Details
                var compFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in FabConDetEnty.PlanFabricDet)
                {



                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }

                    if (PFabItem.type == "KNITS" || PFabItem.FabricType == "K")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = 0,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = "K",//PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = FabConDetEnty.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.type == "PANELS" || PFabItem.FabricType == "P")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Woven_Req_InMtrs,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = "P",////PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = FabConDetEnty.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.type == "WOVEN" || PFabItem.FabricType == "W")
                    {
                        compFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Woven_Req_InMtrs,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Weight,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = "W",//PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = FabConDetEnty.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                }

                var compFabLossList = new List<Fab_Plan_ProLoss>();
                if (FabConDetEnty.PlanLoss != null)
                {
                    foreach (var PFabLossItem in FabConDetEnty.PlanLoss)
                    {

                        compFabLossList.Add(new Fab_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PFabLossItem.SlNo,
                            ProcessId = PFabLossItem.ProcessId,
                            Loss_Per = PFabLossItem.Loss_Per,
                            CompSlNo = PFabLossItem.CompSNo,
                            GColorId = PFabLossItem.FLGColorID,


                        });

                    }
                }


                var result = PlanConRep.AddDetFabItemData(planmasFabInsert,compFabList, compFabLossList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PlanningMain>> LoadEntrystatus(string Ordno, int Styleid, int Itmid)
        {
            try
            {
                var ProductWO = PlanConRep.LoadEntrystatus(Ordno, Styleid, Itmid);

                return new Response<IQueryable<PlanningMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateFabDetEntry(PlanningMain PFabEntry)
        {
            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasFEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PFabEntry.CompanyID,
                    Buy_Ord_MasId = PFabEntry.BMasID,
                    Order_No = PFabEntry.Order_No,
                    StyleID = PFabEntry.StyleID,
                    ItemID = PFabEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = PFabEntry.PlanID,
                    PA = PFabEntry.PA

                };



                //Fabric Details
                var fcompFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PFabEntry.PlanFabricDet)
                {



                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }

                    //compFabList.Add(new Fabric_Plan
                    //{


                    //    //FPlanId=PFabIte
                    //    CompSlNo = PFabItem.CompSlNo,
                    //    PlanID = PFabItem.PlanID,
                    //    ColorID = PFabItem.ColorID,
                    //    SizeId = PFabItem.SizeId,
                    //    Prdn_Qty = PFabItem.Prdn_Qty,
                    //    Fabric_Req = PFabItem.Weight,
                    //    Grammage = PFabItem.Grammage,
                    //    Woven_Req_InMtrs = 0,
                    //    LossGain = 0,//PFabItem.CompSlNo,
                    //    FabricId = PFabItem.FabricID,
                    //    Fabric_type = PFabItem.FabricType,
                    //    Fab_WidthId = PFabItem.GreyWidthID,
                    //    Table_WidthID = PFabItem.FinishWidthID,
                    //    BaseColorID = PFabItem.BColorID,
                    //    BColorPur_Qty = PFabItem.BColorPQty,
                    //    FinishColorID = PFabItem.FColorID,
                    //    FColorPur_Qty = PFabItem.FColorPQty,
                    //    PrintColorId = PID,//PFabItem.PColorID,
                    //    EntryDate = PEntry.EDate,
                    //    //Knit_GSM=PFabItem,
                    //    Fin_GSM = PFabItem.FGsm,
                    //    //Loop_Len=PFabItem.CompSlNo,
                    //    //Texture=PFabItem.CompSlNo,
                    //    //Content = PFabItem.CompSlNo,
                    //    Gauge = "",

                    //});
                    if (PFabItem.FabricType == "KNITS" || PFabItem.FabricType == "K")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = 0,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PFabEntry.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit

                        });
                    }
                    else if (PFabItem.FabricType == "PANELS" || PFabItem.FabricType == "P")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Woven_Req_InMtrs,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PFabEntry.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }
                    else if (PFabItem.FabricType == "WOVEN" || PFabItem.FabricType == "W")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {


                            //FPlanId=PFabIte
                            CompSlNo = PFabItem.CompSlNo,
                            PlanID = PFabItem.PlanID,
                            ColorID = PFabItem.ColorID,
                            SizeId = PFabItem.SizeId,
                            Prdn_Qty = PFabItem.Prdn_Qty,
                            Fabric_Req = PFabItem.Weight,
                            Grammage = PFabItem.Grammage,
                            Woven_Req_InMtrs = PFabItem.Weight,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = PFabItem.FabricID,
                            Fabric_type = PFabItem.FabricType,
                            Fab_WidthId = PFabItem.GreyWidthID,
                            Table_WidthID = PFabItem.FinishWidthID,
                            BaseColorID = PFabItem.BColorID,
                            BColorPur_Qty = PFabItem.BColorPQty,
                            FinishColorID = PFabItem.FColorID,
                            FColorPur_Qty = PFabItem.FColorPQty,
                            PrintColorId = PID,//PFabItem.PColorID,
                            EntryDate = PFabEntry.EDate,
                            Knit_GSM = PFabItem.KGsm,
                            Fin_GSM = PFabItem.FGsm,
                            Loop_Len = PFabItem.LoopLen,
                            Texture = PFabItem.texture,
                            Content = PFabItem.content,
                            Gauge = PFabItem.guage == null ? "" : PFabItem.guage,

                        });
                    }


                }

                var fcompFabLossList = new List<Fab_Plan_ProLoss>();
                if (PFabEntry.PlanLoss != null)
                {
                    foreach (var PFabLossItem in PFabEntry.PlanLoss)
                    {

                        fcompFabLossList.Add(new Fab_Plan_ProLoss
                        {
                            
                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PFabLossItem.SlNo,
                            ProcessId = PFabLossItem.ProcessId,
                            Loss_Per = PFabLossItem.Loss_Per,
                            CompSlNo = PFabLossItem.CompSNo,
                            FPlanId = PFabLossItem.FPlanId,
                            GColorId = PFabLossItem.FLGColorID,


                            
                        });

                    }
                }
                
                var result = PlanConRep.UpdateFabDetData(planmasFEdit, fcompFabList, fcompFabLossList, PFabEntry.PrgThr, PFabEntry.Mode);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }

        public Response<bool> BitFabSave(PlanningMain PFabEntry)
        {
            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasFEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PFabEntry.CompanyID,
                    Buy_Ord_MasId = PFabEntry.BMasID,
                    Order_No = PFabEntry.Order_No,
                    StyleID = PFabEntry.StyleID,
                    ItemID = PFabEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    Bit_Plan="E",
                    PlanID = PFabEntry.PlanID,
                    PA = PFabEntry.PA

                };

                //Fabric Details
                var fcompFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PFabEntry.PlanFabricDet)
                {

                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }

                   
                    if (PFabItem.FabricType == "KNITS" || PFabItem.FabricType == "K")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {
                            FPlanId = PFabItem.FPlanId,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit
                        });
                    }

                    if (PFabItem.FabricType == "W" )
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {
                            FPlanId = PFabItem.FPlanId,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit
                        });
                    }

                }



                var result = PlanConRep.BitFabSave(planmasFEdit, fcompFabList, PFabEntry.PrgThr, PFabEntry.Mode);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }


        public Response<bool> BitFabUpdate(PlanningMain PFabEntry)
        {
            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasFEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PFabEntry.CompanyID,
                    Buy_Ord_MasId = PFabEntry.BMasID,
                    Order_No = PFabEntry.Order_No,
                    StyleID = PFabEntry.StyleID,
                    ItemID = PFabEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    Bit_Plan = "E",
                    PlanID = PFabEntry.PlanID,
                    PA = PFabEntry.PA

                };

                //Fabric Details
                var fcompFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PFabEntry.PlanFabricDet)
                {

                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }


                    if (PFabItem.FabricType == "KNITS" || PFabItem.FabricType == "K")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {
                            FPlanId = PFabItem.FPlanId,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit
                        });
                    }

                    if (PFabItem.FabricType == "W")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {
                            FPlanId = PFabItem.FPlanId,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit
                        });
                    }
                }



                var result = PlanConRep.BitFabUpdate(planmasFEdit, fcompFabList, PFabEntry.PrgThr, PFabEntry.Mode);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }

        public Response<bool> BitFabDelete(PlanningMain PFabEntry)
        {
            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasFEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PFabEntry.CompanyID,
                    Buy_Ord_MasId = PFabEntry.BMasID,
                    Order_No = PFabEntry.Order_No,
                    StyleID = PFabEntry.StyleID,
                    ItemID = PFabEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    Bit_Plan ="E",
                    PlanID = PFabEntry.PlanID,
                    PA = PFabEntry.PA

                };

                //Fabric Details
                var fcompFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PFabEntry.PlanFabricDet)
                {

                    int? PID = 0;

                    if (PFabItem.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = PFabItem.PColorID;
                    }


                    if (PFabItem.FabricType == "KNITS" || PFabItem.FabricType == "K")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {
                            FPlanId=PFabItem.FPlanId,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit
                        });
                    }
                    if (PFabItem.FabricType == "W")
                    {
                        fcompFabList.Add(new Fabric_Plan
                        {
                            FPlanId = PFabItem.FPlanId,
                            BitItemId = PFabItem.BitItemId,
                            BitSizeId = PFabItem.BitSizeId,
                            PiecePerBit = PFabItem.PiecePerBit
                        });
                    }
                }



                var result = PlanConRep.BitFabDelete(planmasFEdit, fcompFabList, PFabEntry.PrgThr, PFabEntry.Mode);

                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }

        public Response<bool> CreatePlanningYarnDetEntry(PlanningMain YarnDetEnty)
        {
            try
            {
                var FType = "";
                AxonApparel.Repository.Planning_Mas planmasyrnInsert = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = YarnDetEnty.CompanyID,
                    Buy_Ord_MasId = YarnDetEnty.BMasID,
                    Order_No = YarnDetEnty.Order_No,
                    StyleID = YarnDetEnty.StyleID,
                    ItemID = YarnDetEnty.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "E",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = YarnDetEnty.PlanID,
                    PA = YarnDetEnty.PA

                };

                var ccompYarnList = new List<Yarn_Plan_Mas>();

                if (YarnDetEnty.PlanYarnN != null)
                {


                    foreach (var PYarnItem in YarnDetEnty.PlanYarnN)
                    {

                        int? ComPID = 0;

                        if (PYarnItem.ComponentId == 0)
                        {
                            ComPID = null;
                        }
                        else
                        {
                            ComPID = PYarnItem.ComponentId;
                        }

                        if (PYarnItem.Fabric_type == "WOVEN")
                        {
                            FType = "W";
                        }
                        else if (PYarnItem.Fabric_type == "PANELS")
                        {
                            FType = "P";
                        }
                        else if (PYarnItem.Fabric_type == "KNITS")
                        {
                            FType = "K";
                        }
                        else
                        {
                            FType = PYarnItem.Fabric_type;
                        }
                        ccompYarnList.Add(new Yarn_Plan_Mas
                        {

                            //YPlanmasID = PYarnItem.YPlanmasID,
                            PlanId = PYarnItem.PlanId,
                            FabricID = PYarnItem.FabricID,
                            Fabric_ColorId = PYarnItem.Fabric_ColorId,
                            Fabric_Weight = PYarnItem.Fabric_Weight,
                            Fabric_type = FType,//PYarnItem.Fabric_type,
                            EntryDate = YarnDetEnty.EDate,
                            SlNo = PYarnItem.YSlno,
                            CompSlNo = PYarnItem.SlNo,
                            ComponentID = ComPID,//PYarnItem.ComponentId,

                        });

                    }
                }


                //SlNo =ComponentSerial No ,YSNo=Yarnpalnmasserial No 

                var ccompYarnDetList = new List<Yarn_Plan_Det>();
                if (YarnDetEnty.PlanYarnDet != null)
                {
                    foreach (var PYarnDetItem in YarnDetEnty.PlanYarnDet)
                    {


                        ccompYarnDetList.Add(new Yarn_Plan_Det
                        {


                            //YPlanDetID = PYarnDetItem.YplanDetID,
                            //YPlanMasID = PYarnDetItem.YPlanMasID,
                            Knit_In_ItemId = PYarnDetItem.Knit_In_ItemId,
                            Knit_In_SizeID = PYarnDetItem.Knit_In_SizeID,
                            Knit_in_ColorID = PYarnDetItem.Knit_in_ColorID,
                            Knit_In_Per = PYarnDetItem.Knit_In_Per,
                            Knit_In_Qty = PYarnDetItem.Knit_In_Qty,
                            Loss_per = PYarnDetItem.Loss_per,
                            Dyeing_Req = PYarnDetItem.Dyeing_Req,
                            SlNo = PYarnDetItem.CompSno,
                            YSNo = PYarnDetItem.YSlNo,
                            Fabric_ColorId = PYarnDetItem.BaseColorID,
                            FabricID = PYarnDetItem.FabricID,
                            YDSlno = PYarnDetItem.SlNo

                        });

                    }
                }


                //loss
                var ccompyarnLossList = new List<Yarn_Plan_ProLoss>();
                if (YarnDetEnty.PlanYarnLoss != null)
                {
                    foreach (var PYarnLossItem in YarnDetEnty.PlanYarnLoss)
                    {

                        ccompyarnLossList.Add(new Yarn_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnLossItem.SlNo,
                            ProcessId = PYarnLossItem.ProcessId,
                            Loss_Per = PYarnLossItem.Loss_Per,
                            FSNo = PYarnLossItem.SNo,
                            CompSNo = PYarnLossItem.CompSNo,


                        });

                    }
                }


                //Dyeing
                var ccompyarndyeList = new List<Yarn_Plan_Dyeing>();
                if (YarnDetEnty.PlanYarnDyeing != null)
                {
                    foreach (var PYarnDyeItem in YarnDetEnty.PlanYarnDyeing)
                    {

                        ccompyarndyeList.Add(new Yarn_Plan_Dyeing
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnDyeItem.SlNo,
                            Garment_ColorID = PYarnDyeItem.Garment_ColorID,
                            GWeight = PYarnDyeItem.GWeight,
                            Yarn_DyeColorID = PYarnDyeItem.Yarn_DyeColorID,
                            Qty_Per = PYarnDyeItem.Qty_Per,
                            Weight = PYarnDyeItem.Weight,
                            Purchase_Qty = PYarnDyeItem.Purchase_Qty,
                            Courses = PYarnDyeItem.Courses,
                            CompSlNo = PYarnDyeItem.CompSlNo,
                            YSNo = PYarnDyeItem.YDSlNo

                        });

                    }
                }


                var result = PlanConRep.AddDetYarnItemData(planmasyrnInsert, ccompYarnList, ccompYarnDetList, ccompyarnLossList, ccompyarndyeList);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateYarnDetEntry(PlanningMain PYEntry)
        {
            string Group = "";

            try
            {

                AxonApparel.Repository.Planning_Mas planmasYEdit = new AxonApparel.Repository.Planning_Mas
                {
                    CompanyID = PYEntry.CompanyID,
                    Buy_Ord_MasId = PYEntry.BMasID,
                    Order_No = PYEntry.Order_No,
                    StyleID = PYEntry.StyleID,
                    ItemID = PYEntry.ItemID,
                    Con_Plan = "E",
                    Fabric_Plan = "E",
                    Yarn_Plan = "N",
                    Acc_Plan = "N",
                    Pack_Plan = "N",
                    PlanID = PYEntry.PlanID,
                    PA = PYEntry.PA

                };



                //Yarn Details

                var ecompYarnList = new List<Yarn_Plan_Mas>();
                if (PYEntry.PlanYarnN != null)
                {
                    foreach (var PYarnItem in PYEntry.PlanYarnN)
                    {
                        int? ComPID = 0;

                        if (PYarnItem.ComponentId == 0)
                        {
                            ComPID = null;
                        }
                        else
                        {
                            ComPID = PYarnItem.ComponentId;
                        }

                        ecompYarnList.Add(new Yarn_Plan_Mas
                        {

                            //YPlanmasID = PYarnItem.YPlanmasID,
                            PlanId = PYarnItem.PlanId,
                            FabricID = PYarnItem.FabricID,
                            Fabric_ColorId = PYarnItem.Fabric_ColorId,
                            Fabric_Weight = PYarnItem.Fabric_Weight,
                            Fabric_type = PYarnItem.Fabric_type,
                            EntryDate = PYEntry.EDate,
                            SlNo = PYarnItem.YSlno,
                            CompSlNo = PYarnItem.SlNo,
                            ComponentID = ComPID,//PYarnItem.ComponentId,

                        });

                    }
                }
                var ecompYarnDetList = new List<Yarn_Plan_Det>();
                if (PYEntry.PlanYarnDet != null)
                {
                    foreach (var PYarnDetItem in PYEntry.PlanYarnDet)
                    {


                        ecompYarnDetList.Add(new Yarn_Plan_Det
                        {



                            //YPlanDetID = PYarnDetItem.YplanDetID,
                            //YPlanMasID = PYarnDetItem.YPlanMasID,
                            Knit_In_ItemId = PYarnDetItem.Knit_In_ItemId,
                            Knit_In_SizeID = PYarnDetItem.Knit_In_SizeID,
                            Knit_in_ColorID = PYarnDetItem.Knit_in_ColorID,
                            Knit_In_Per = PYarnDetItem.Knit_In_Per,
                            Knit_In_Qty = PYarnDetItem.Knit_In_Qty,
                            Loss_per = PYarnDetItem.Loss_per,
                            Dyeing_Req = PYarnDetItem.Dyeing_Req,
                            YDSlno = PYarnDetItem.SlNo,
                            SlNo = PYarnDetItem.CompSno,
                            YSNo = PYarnDetItem.YSlNo,
                            Fabric_ColorId = PYarnDetItem.BaseColorID,
                            FabricID = PYarnDetItem.FabricID,

                        });

                    }
                }


                //loss
                var ecompyarnLossList = new List<Yarn_Plan_ProLoss>();
                if (PYEntry.PlanYarnLoss != null)
                {
                    foreach (var PYarnLossItem in PYEntry.PlanYarnLoss)
                    {

                        ecompyarnLossList.Add(new Yarn_Plan_ProLoss
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnLossItem.SlNo,
                            ProcessId = PYarnLossItem.ProcessId,
                            Loss_Per = PYarnLossItem.Loss_Per,
                            FSNo = PYarnLossItem.SNo,
                            CompSNo = PYarnLossItem.CompSNo,




                        });

                    }
                }


                //Dyeing
                var ecompyarndyeList = new List<Yarn_Plan_Dyeing>();
                if (PYEntry.PlanYarnDyeing != null)
                {
                    foreach (var PYarnDyeItem in PYEntry.PlanYarnDyeing)
                    {

                        ecompyarndyeList.Add(new Yarn_Plan_Dyeing
                        {


                            //FPlanId = PFabLossItem.FPlanId,
                            SlNo = PYarnDyeItem.SlNo,
                            Garment_ColorID = PYarnDyeItem.Garment_ColorID,
                            GWeight = PYarnDyeItem.GWeight,
                            Yarn_DyeColorID = PYarnDyeItem.Yarn_DyeColorID,
                            Qty_Per = PYarnDyeItem.Qty_Per,
                            Weight = PYarnDyeItem.Weight,
                            Purchase_Qty = PYarnDyeItem.Purchase_Qty,
                            Courses = PYarnDyeItem.Courses,
                            YSNo = PYarnDyeItem.YDSlNo,
                            CompSlNo = PYarnDyeItem.CompSlNo,


                        });

                    }
                }


                var result = PlanConRep.UpdateYarnDetData(planmasYEdit, ecompYarnList,ecompYarnDetList, ecompyarnLossList, ecompyarndyeList);
                
                //
                return new Response<bool>(result, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }

        }


        public Response<IList<PlanningFabricDetails>> GetConFabricBStockList(int FabricID, int BColorID, int GreyWidthID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetConRepFabricBStockList(FabricID, BColorID, GreyWidthID);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanningFabricDetails>> GetConFabricFStockList(int FabricID, int FColorID, int FinishWidthID)
        {
            try
            {
                var CurConDetList = PlanConRep.GetConRepFabricFStockList(FabricID, FColorID, FinishWidthID);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanningFabricDetails>> LoadStockDetails(int Itemid, int Sizeid, int Colorid)
        {
            try
            {
                var CurConDetList = PlanConRep.LoadStockDetails(Itemid, Sizeid, Colorid);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.PlanningMain>> LoadPurYarnDetails(int Planid)
        {
            try
            {
                var CurConDetList = PlanConRep.LoadPurYarnDetails(Planid);

                return new Response<IList<Domain.PlanningMain>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.PlanningMain>> LoadFabDetails(int Planid)
        {
            try
            {
                var CurConDetList = PlanConRep.LoadFabDetails(Planid);

                return new Response<IList<Domain.PlanningMain>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.PlanningMain>> LoadFabPurDetails(int Planid)
        {
            try
            {
                var CurConDetList = PlanConRep.LoadFabPurDetails(Planid);

                return new Response<IList<Domain.PlanningMain>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.PlanningMain>> LoadYarnPOQtyDetails(int Planid)
        {
            try
            {
                var CurConDetList = PlanConRep.LoadYarnPOQtyDetails(Planid);

                return new Response<IList<Domain.PlanningMain>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.PlanningMain>> LoadAmendDetails(int Stylerowid, string jmasid, string Workordno)
        {
            try
            {
                var CurConDetList = PlanConRep.LoadAmendDetails(Stylerowid, jmasid, Workordno);

                return new Response<IList<Domain.PlanningMain>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<Domain.PlanningMain>> GetBalQty(string OrderNo, int Itemid, int Colorid, int Sizeid)
        {
            try
            {
                var CurConDetList = PlanConRep.GetBalQty( OrderNo,  Itemid,  Colorid,  Sizeid);

                return new Response<IList<Domain.PlanningMain>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<Domain.PlanningMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
