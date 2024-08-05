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
    public class PlanningFabricBusiness : IPlanningFabricBusiness
    {
        IPlanningFabricRepository PlanFab = new PlanningFabricRepository();

        public Response<IEnumerable<PlanningFabric>> GetDataPlanFabricList(int PLID)
        {
            try
            {
                var PlFab = PlanFab.GetCompFabricItemDetails(PLID);

                return new Response<IEnumerable<PlanningFabric>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IEnumerable<PlanningFabric>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanningFabricDetails>> GetDataPlanFabricDetList(int PLID, int CMID)
        {
            try
            {
                var PlFab = PlanFab.GetCompDetFabricItemDetails(PLID, CMID);

                return new Response<IList<PlanningFabricDetails>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IList<PlanLoss>> GetDataPlanFabricLossList(int PLID, int CMID)
        {
            try
            {
                var PlFab = PlanFab.GetCompDetFabricLossDetails(PLID, CMID);

                return new Response<IList<PlanLoss>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanLoss>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanningFabricDetails>> GetConFabricplanList(int PID, int CNO)
        {
            try
            {
                var CurConDetList = PlanFab.GetConFabricPlanList(PID, CNO);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<bool> CreatePlanningFabricEntry(PlanningFabric PlanFabEnty)
        {

            var compFabList = new List<Fabric_Plan>();

            foreach (var PFabItem in PlanFabEnty.PlanFabricDet)
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
                    EntryDate = PlanFabEnty.EntryDate,
                    //Knit_GSM=PFabItem,
                    Fin_GSM = PFabItem.FGsm,
                    //Loop_Len=PFabItem.CompSlNo,
                    //Texture=PFabItem.CompSlNo,
                    //Content = PFabItem.CompSlNo,
                    Gauge = "",

                });

            }

            var compFabLossList = new List<Fab_Plan_ProLoss>();
            if (PlanFabEnty.PlanLoss != null)
            {
                foreach (var PFabLossItem in PlanFabEnty.PlanLoss)
                {

                    compFabLossList.Add(new Fab_Plan_ProLoss
                    {


                        //FPlanId = PFabLossItem.FPlanId,
                        SlNo = PFabLossItem.SlNo,
                        ProcessId = PFabLossItem.ProcessId,
                        Loss_Per = PFabLossItem.Loss_Per,
                        CompSlNo = PFabLossItem.CompSNo,


                    });

                }
            }

            var result = PlanFab.AddDetData(compFabList, compFabLossList, PlanFabEnty);


            return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");
        }

        public Response<bool> UpdateFabricEntry(PlanningFabric PFabEntry)
        {
            try
            {
                

                var detailConLossList = new List<Fab_Plan_ProLoss>();
                if (PFabEntry.PlanLoss != null)
                {

                foreach (var CompitemLoss in PFabEntry.PlanLoss)
                {
                    
                        detailConLossList.Add(new Fab_Plan_ProLoss
                        {


                            CompSlNo = CompitemLoss.CompSNo,
                            FPlanId = CompitemLoss.FPlanId,
                            Loss_Per = CompitemLoss.Loss_Per,
                            SlNo = CompitemLoss.SlNo,
                            ProcessId = CompitemLoss.ProcessId,
                            FLPlanID = CompitemLoss.FLPlanID,

                        });
                    }
                }
                
                //var result = PlanFab.UpdateDetData(detailConLossList);

                //


                var detailConPlanFabListEdit = new List<Fabric_Plan>();

                foreach (var ComplanitemFab in PFabEntry.PlanFabricDet)
                {
                    int? PID = 0;

                    if (ComplanitemFab.PColorID == 0)
                    {
                        PID = null;
                    }
                    else
                    {
                        PID = ComplanitemFab.PColorID;
                    }
                   
                        detailConPlanFabListEdit.Add(new Fabric_Plan
                        {

                            //FPlanId=PFabIte
                            CompSlNo = ComplanitemFab.CompSlNo,
                            PlanID = ComplanitemFab.PlanID,
                            ColorID = ComplanitemFab.ColorID,
                            SizeId = ComplanitemFab.SizeId,
                            Prdn_Qty = ComplanitemFab.Prdn_Qty,
                            Fabric_Req = ComplanitemFab.Weight,
                            Grammage = ComplanitemFab.Grammage,
                            Woven_Req_InMtrs = 0,
                            LossGain = 0,//PFabItem.CompSlNo,
                            FabricId = ComplanitemFab.FabricID,
                            Fabric_type = ComplanitemFab.FabricType,
                            Fab_WidthId = ComplanitemFab.GreyWidthID,
                            Table_WidthID = ComplanitemFab.FinishWidthID,
                            BaseColorID = ComplanitemFab.BColorID,
                            BColorPur_Qty = ComplanitemFab.BColorPQty,
                            FinishColorID = ComplanitemFab.FColorID,
                            FColorPur_Qty = ComplanitemFab.FColorPQty,
                            PrintColorId = PID,
                            //EntryDate = ComplanitemFab.EntryDate,
                            EntryDate = PFabEntry.EntryDate,
                            //Knit_GSM=PFabItem,
                            Fin_GSM = ComplanitemFab.FGsm,
                            FPlanId = ComplanitemFab.FPlanId,
                            //Loop_Len=PFabItem.CompSlNo,
                            //Texture=PFabItem.CompSlNo,
                            //Content = PFabItem.CompSlNo,
                            Gauge = "",
                        });
                    //}
                }
                var result1 = PlanFab.UpdateConDetData(detailConLossList,detailConPlanFabListEdit, PFabEntry);
            
                //edit
                var compFabList = new List<Fabric_Plan>();

                foreach (var PFabItem in PFabEntry.PlanFabricDet)
                {


                    //if (PFabItem.FPlanId == 0)
                    //{
                        int? PID = 0;

                        if (PFabItem.PColorID == 0)
                        {
                            PID = null;
                        }
                        else
                        {
                            PID = PFabItem.PColorID;
                        }

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
                            EntryDate = PFabItem.EntryDate,
                            //Knit_GSM=PFabItem,
                            Fin_GSM = PFabItem.FGsm,
                            FPlanId = PFabItem.FPlanId,
                            //Loop_Len=PFabItem.CompSlNo,
                            //Texture=PFabItem.CompSlNo,
                            //Content = PFabItem.CompSlNo,
                            Gauge = "",

                        });
                   // }
                }

                var compFabELossList = new List<Fab_Plan_ProLoss>();

                if (PFabEntry.PlanLoss != null)
                {
                    foreach (var PFabLossItem in PFabEntry.PlanLoss)
                    {

                        compFabELossList.Add(new Fab_Plan_ProLoss
                        {


                            FPlanId = PFabLossItem.FPlanId,
                            SlNo = PFabLossItem.SlNo,
                            ProcessId = PFabLossItem.ProcessId,
                            Loss_Per = PFabLossItem.Loss_Per,
                            CompSlNo = PFabLossItem.CompSNo,
                            FLPlanID = PFabLossItem.FLPlanID,


                        });

                    }
                }

                var result5 = PlanFab.AddDetLossData(compFabELossList, compFabList);
                //



                return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }
        public Response<bool> DeletePlanFabric(PlanningFabric PFabEntry)
        {
            try
            {
            var detailConPlanFabListEdit = new List<Fabric_Plan>();

            foreach (var ComplanitemFab in PFabEntry.PlanFabricDet)
            {
                int? PID = 0;

                if (ComplanitemFab.PColorID == 0)
                {
                    PID = null;
                }
                else
                {
                    PID = ComplanitemFab.PColorID;
                }

                detailConPlanFabListEdit.Add(new Fabric_Plan
                {

                    //FPlanId=PFabIte
                    CompSlNo = ComplanitemFab.CompSlNo,
                    PlanID = ComplanitemFab.PlanID,
                    ColorID = ComplanitemFab.ColorID,
                    SizeId = ComplanitemFab.SizeId,
                    Prdn_Qty = ComplanitemFab.Prdn_Qty,
                    Fabric_Req = ComplanitemFab.Weight,
                    Grammage = ComplanitemFab.Grammage,
                    Woven_Req_InMtrs = 0,
                    LossGain = 0,//PFabItem.CompSlNo,
                    FabricId = ComplanitemFab.FabricID,
                    Fabric_type = ComplanitemFab.FabricType,
                    Fab_WidthId = ComplanitemFab.GreyWidthID,
                    Table_WidthID = ComplanitemFab.FinishWidthID,
                    BaseColorID = ComplanitemFab.BColorID,
                    BColorPur_Qty = ComplanitemFab.BColorPQty,
                    FinishColorID = ComplanitemFab.FColorID,
                    FColorPur_Qty = ComplanitemFab.FColorPQty,
                    PrintColorId = PID,
                    EntryDate = ComplanitemFab.EntryDate,
                    //Knit_GSM=PFabItem,
                    Fin_GSM = ComplanitemFab.FGsm,
                    FPlanId = ComplanitemFab.FPlanId,
                    //Loop_Len=PFabItem.CompSlNo,
                    //Texture=PFabItem.CompSlNo,
                    //Content = PFabItem.CompSlNo,
                    Gauge = "",
                });
                //}
            }
            var result1 = PlanFab.DeleteData(detailConPlanFabListEdit, PFabEntry);

            return new Response<bool>(result1, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanningFabricDetails>> Getcolor()
        {
            try
            {
                var PlFab = PlanFab.GetColor();

                return new Response<IQueryable<PlanningFabricDetails>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IQueryable<PlanningFabricDetails>> Getprintcolor()
        {
            try
            {
                var PlFab = PlanFab.GetPrintColor();

                return new Response<IQueryable<PlanningFabricDetails>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningFabricDetails>> GetDataPlanFabrictotDetList(int PID)
        {
            try
            {
                var PlFab = PlanFab.GetCompDetFabricTotItemDetails(PID);

                return new Response<IList<PlanningFabricDetails>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningFabricDetails>> GetConFabricplantotList(int PID)
        {
            try
            {
                var CurConDetList = PlanFab.GetConFabricPlantotList(PID);

                return new Response<IList<PlanningFabricDetails>>(CurConDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PlanningFabricDetails>> GSizeList()
        {
            try
            {
                var PlFab = PlanFab.GSizeList();

                return new Response<IQueryable<PlanningFabricDetails>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<PlanningFabricDetails>> BitItemList()
        {
            try
            {
                var PlFab = PlanFab.BitItemList();

                return new Response<IQueryable<PlanningFabricDetails>>(PlFab, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningFabricDetails>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


    }
}
