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
    public class PlanningYarnBusiness : IPlanningYarnBusiness
    {
        IPlanningYarnRepository PlanYarn = new PlanningYarnRepository();

        public Response<IQueryable<PlanningYarn>> GetDataPlanYarnList(int PLID)
        {
            try
            {
                var PlFabY = PlanYarn.GetFabricItemDetails(PLID);

                return new Response<IQueryable<PlanningYarn>>(PlFabY, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningYarn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IList<PlanningYarnDyeing>> GetDataPlanDyeDetList(int PlanID, int StyleRowId, int ItemId, int BColorId, int FabricId, int YDSlNo, decimal Qty)
        {
            try
            {
                var PlFabYd = PlanYarn.GetDyeingItemDetails(PlanID, StyleRowId, ItemId, BColorId, FabricId, YDSlNo, Qty);

                return new Response<IList<PlanningYarnDyeing>>(PlFabYd, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnDyeing>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //Edit Loss Details

        public Response<IList<PlanningYarnLoss>> GetDataPlanYarnLossList(int PLID, int CMID)
        {
            try
            {
                var PlY = PlanYarn.GetCompDetYarnLossDetails(PLID, CMID);

                return new Response<IList<PlanningYarnLoss>>(PlY, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnLoss>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        //edit yarn det details
        public Response<IList<PlanningYarnDet>> GetDataPlanYarnEditList(int YMID, string ONo, int StID)
        {
            try
            {
                var PlE = PlanYarn.GetEditYarnDetDetails(YMID, ONo, StID);

                return new Response<IList<PlanningYarnDet>>(PlE, Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IList<PlanningYarnDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        //edit yarn dyeing

        public Response<IList<PlanningYarnDyeing>> GetYarnDyeingplanList(int PId, int IteID, int FabID, int bColorID, int StRowID, int YMaID, int YDeID, decimal Qty, int Dying, int YlNo)
        {
            try
            {
                var PlD = PlanYarn.GetYarnDyeingRepList(PId, IteID, FabID, bColorID, StRowID, YMaID, YDeID, Qty, Dying, YlNo);

                return new Response<IList<PlanningYarnDyeing>>(PlD, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningYarnDyeing>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreatePlanningYarnEntry(PlanningYarn PlanYarnEnty)
        {

            var compYarnList = new List<Yarn_Plan_Mas>();

            foreach (var PYarnItem in PlanYarnEnty.PlanYarnN)
            {

                compYarnList.Add(new Yarn_Plan_Mas
                {

                    //YPlanmasID = PYarnItem.YPlanmasID,
                    PlanId = PYarnItem.PlanId,
                    FabricID = PYarnItem.FabricID,
                    Fabric_ColorId = PYarnItem.Fabric_ColorId,
                    Fabric_Weight = PYarnItem.Fabric_Weight,
                    Fabric_type = PYarnItem.Fabric_type,
                    EntryDate = PlanYarnEnty.EntryDate,
                    SlNo = PYarnItem.SlNo,

                });

            }

            var compYarnDetList = new List<Yarn_Plan_Det>();
            if (PlanYarnEnty.PlanYarnDet != null)
            {
                foreach (var PYarnDetItem in PlanYarnEnty.PlanYarnDet)
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
                        SlNo = PYarnDetItem.YSlNo,
                        YSNo = PYarnDetItem.SlNo,
                        Fabric_ColorId = PYarnDetItem.BaseColorID,
                        FabricID = PYarnDetItem.FabricID,

                    });

                }
            }


            //loss
            var compyarnLossList = new List<Yarn_Plan_ProLoss>();
            if (PlanYarnEnty.PlanYarnLoss != null)
            {
                foreach (var PYarnLossItem in PlanYarnEnty.PlanYarnLoss)
                {

                    compyarnLossList.Add(new Yarn_Plan_ProLoss
                    {


                        //FPlanId = PFabLossItem.FPlanId,
                        SlNo = PYarnLossItem.SlNo,
                        ProcessId = PYarnLossItem.ProcessId,
                        Loss_Per = PYarnLossItem.Loss_Per,
                        FSNo = PYarnLossItem.SNo,


                    });

                }
            }


            //Dyeing
            var compyarndyeList = new List<Yarn_Plan_Dyeing>();
            if (PlanYarnEnty.PlanYarnDyeing != null)
            {
                foreach (var PYarnDyeItem in PlanYarnEnty.PlanYarnDyeing)
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


                    });

                }
            }
            // var result1 = PlanFab.AddDetData(compFabList, compyarnLossList);
            //

            var result1 = PlanYarn.AddDetData(compYarnList, compYarnDetList, compyarnLossList, compyarndyeList, PlanYarnEnty);


            return new Response<bool>(result1, Status.SUCCESS, "Saved Successfully");
        }
        public Response<bool> DeletePlanYarn(int PID)
        {
            return new Response<bool>(PlanYarn.DeleteData(PID), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<bool> UpdateYarnEntry(PlanningYarn PYEntry)
        {
            try
            {

                if (PYEntry.PlanYarnLoss != null)
                {
                    var detailYLossList = new List<Yarn_Plan_ProLoss>();

                    foreach (var YitemLoss in PYEntry.PlanYarnLoss)
                    {
                        detailYLossList.Add(new Yarn_Plan_ProLoss
                        {


                            FSNo = YitemLoss.SNo,
                            YPlanDetID = YitemLoss.YPlanDetID,
                            Loss_Per = YitemLoss.Loss_Per,
                            SlNo = YitemLoss.SlNo,
                            ProcessId = YitemLoss.ProcessId,
                            YPlanLossID = YitemLoss.YPlanLossID,

                        });
                    }
                    var result = PlanYarn.UpdateYLossData(detailYLossList);
                }




                var detailConPlanyarnmasList = new List<Yarn_Plan_Mas>();

                foreach (var Complanitemyarn in PYEntry.PlanYarnN)
                {
                    detailConPlanyarnmasList.Add(new Yarn_Plan_Mas
                    {

                        PlanId = Complanitemyarn.PlanId,
                        FabricID = Complanitemyarn.FabricID,
                        Fabric_ColorId = Complanitemyarn.Fabric_ColorId,
                        Fabric_Weight = Complanitemyarn.Fabric_Weight,
                        Fabric_type = Complanitemyarn.Fabric_type,
                        EntryDate = PYEntry.EntryDate,
                        SlNo = Complanitemyarn.SlNo,
                        YPlanmasID = Complanitemyarn.YPlanmasID,

                    });
                }
               // var result1 = PlanYarn.UpdateYMasData(detailConPlanyarnmasList);


                var detailConPlanyarndetList = new List<Yarn_Plan_Det>();

                foreach (var Complanitemdetyarn in PYEntry.PlanYarnDet)
                {
                    detailConPlanyarndetList.Add(new Yarn_Plan_Det
                    {
                        Knit_In_ItemId = Complanitemdetyarn.Knit_In_ItemId,
                        Knit_In_SizeID = Complanitemdetyarn.Knit_In_SizeID,
                        Knit_in_ColorID = Complanitemdetyarn.Knit_in_ColorID,
                        Knit_In_Per = Complanitemdetyarn.Knit_In_Per,
                        Knit_In_Qty = Complanitemdetyarn.Knit_In_Qty,
                        Loss_per = Complanitemdetyarn.Loss_per,
                        Dyeing_Req = Complanitemdetyarn.Dyeing_Req,
                        SlNo = Complanitemdetyarn.YSlNo,
                        YSNo = Complanitemdetyarn.SlNo,
                        Fabric_ColorId = Complanitemdetyarn.BaseColorID,
                        FabricID = Complanitemdetyarn.FabricID,
                        YPlanMasID = Complanitemdetyarn.YPlanMasID,
                        YPlanDetID = Complanitemdetyarn.YplanDetID,

                    });
                }
                //var result2 = PlanYarn.UpdateYDetData(detailConPlanyarndetList);


                if (PYEntry.PlanYarnDyeing != null)
                {

                    var detailConPlanyarndyeingList = new List<Yarn_Plan_Dyeing>();

                    foreach (var Complanitemdyeingyarn in PYEntry.PlanYarnDyeing)
                    {
                        detailConPlanyarndyeingList.Add(new Yarn_Plan_Dyeing
                        {
                            SlNo = Complanitemdyeingyarn.SlNo,
                            Garment_ColorID = Complanitemdyeingyarn.Garment_ColorID,
                            GWeight = Complanitemdyeingyarn.GWeight,
                            Yarn_DyeColorID = Complanitemdyeingyarn.Yarn_DyeColorID,
                            Qty_Per = Complanitemdyeingyarn.Qty_Per,
                            Weight = Complanitemdyeingyarn.Weight,
                            Purchase_Qty = Complanitemdyeingyarn.Purchase_Qty,
                            Courses = Complanitemdyeingyarn.Courses,
                            YSNo = Complanitemdyeingyarn.YDSlNo,
                            YPlanDetID = Complanitemdyeingyarn.YPlanDetID,
                            YPlanDyeID = Complanitemdyeingyarn.YPlanDyeID,

                        });
                    }
                    var result1 = PlanYarn.UpdateYDyeingData( detailConPlanyarnmasList, detailConPlanyarndetList,detailConPlanyarndyeingList);
                }

                //Edit Screnn add new item 




                // Edit Add in Yarn details

                var detailYarnEditList = new List<Yarn_Plan_Det>();



                foreach (var YitemDet1 in PYEntry.PlanYarnDet)
                {
                    detailYarnEditList.Add(new Yarn_Plan_Det
                    {


                        Knit_In_ItemId = YitemDet1.Knit_In_ItemId,
                        Knit_In_SizeID = YitemDet1.Knit_In_SizeID,
                        Knit_in_ColorID = YitemDet1.Knit_in_ColorID,
                        Knit_In_Per = YitemDet1.Knit_In_Per,
                        Knit_In_Qty = YitemDet1.Knit_In_Qty,
                        Loss_per = YitemDet1.Loss_per,
                        Dyeing_Req = YitemDet1.Dyeing_Req,
                        SlNo = YitemDet1.YSlNo,
                        YSNo = YitemDet1.SlNo,
                        Fabric_ColorId = YitemDet1.BaseColorID,
                        FabricID = YitemDet1.FabricID,
                        YPlanMasID = YitemDet1.YPlanMasID,
                        YPlanDetID = YitemDet1.YplanDetID,

                    });
                }




                //yarn loss

                var detailYLossList1 = new List<Yarn_Plan_ProLoss>();
                if (PYEntry.PlanYarnLoss != null)
                {


                    foreach (var YitemLoss1 in PYEntry.PlanYarnLoss)
                    {
                        detailYLossList1.Add(new Yarn_Plan_ProLoss
                        {


                            //FSNo = YitemLoss1.SlNo,
                            //YPlanDetID = YitemLoss1.YPlanDetID,
                            //Loss_Per = YitemLoss1.Loss_Per,
                            //SlNo = YitemLoss1.SlNo,
                            //ProcessId = YitemLoss1.ProcessId,
                            YPlanLossID = YitemLoss1.YPlanLossID,


                            SlNo = YitemLoss1.SlNo,
                            ProcessId = YitemLoss1.ProcessId,
                            Loss_Per = YitemLoss1.Loss_Per,
                            FSNo = YitemLoss1.SNo,

                        });
                    }


                }

                var result2 = PlanYarn.AddDetLossData(detailYLossList1, detailYarnEditList);

                //Dye Edit

                var detailYDyeList1 = new List<Yarn_Plan_Dyeing>();
                if (PYEntry.PlanYarnDyeing != null)
                {


                    foreach (var YitemDye in PYEntry.PlanYarnDyeing)
                    {
                        detailYDyeList1.Add(new Yarn_Plan_Dyeing
                        {

                            SlNo = YitemDye.SlNo,
                            Garment_ColorID = YitemDye.Garment_ColorID,
                            GWeight = YitemDye.GWeight,
                            Yarn_DyeColorID = YitemDye.Yarn_DyeColorID,
                            Qty_Per = YitemDye.Qty_Per,
                            Weight = YitemDye.Weight,
                            Purchase_Qty = YitemDye.Purchase_Qty,
                            Courses = YitemDye.Courses,
                            YSNo = YitemDye.YDSlNo,
                            YPlanDetID = YitemDye.YPlanDetID,
                            YPlanDyeID = YitemDye.YPlanDyeID,


                        });
                    }


                }

                var result3 = PlanYarn.AddDetDyeData(detailYDyeList1, detailYarnEditList);

                return new Response<bool>(result3, Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }


        }
    }
}
