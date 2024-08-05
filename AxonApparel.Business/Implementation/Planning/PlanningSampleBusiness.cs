using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;

namespace AxonApparel.Business
{
    public class PlanningSampleBusiness : IPlanningSampleBusiness
    {
        IPlanningSampleRepository PlanSamRep = new PlanningSampleRepository();

        public Response<IQueryable<PlanningSampleMain>> GetDataSamPlanDetails(int StyRowId)
        {
            try
            {
                var ProductWO = PlanSamRep.GetDataSamRepPlanDetails(StyRowId);

                return new Response<IQueryable<PlanningSampleMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningSampleMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> CreatePlanningSamEntry(PlanningSampleMain PlanSamEnty)
        {
            try
            {

                var FabList = new List<Sample_FabricPlan>();

                foreach (var PFItem in PlanSamEnty.SamFabricItemDet)
                {

                    int? BCID = 0;

                    if (PFItem.BColorID == 0)
                    {
                        BCID = null;
                    }
                    else
                    {
                        BCID = PFItem.BColorID;
                    }

                    int? FCID = 0;

                    if (PFItem.FColorID == 0)
                    {
                        FCID = null;
                    }
                    else
                    {
                        FCID = PFItem.FColorID;
                    }

                    int? PCID = 0;

                    if (PFItem.PrintColorID == 0)
                    {
                        PCID = null;
                    }
                    else
                    {
                        PCID = PFItem.PrintColorID;
                    }


                    FabList.Add(new Sample_FabricPlan
                    {
                        SampleJobNo = PFItem.SampleJobNo,
                        ItemID = PFItem.FabItemID,
                        BColorID = BCID,//PFItem.BColorID,
                        FColorID = FCID,//PFItem.FColorID,
                        SizeID = PFItem.SizeID,
                        ProgramQty = PFItem.ProgramQty,
                        PrintColorId = PCID,// PFItem.PrintColorID,                   
                        BPurQty = PFItem.BPurQty,
                        FPurQty = PFItem.FPurQty,
                        FSNo = PFItem.SNo,
                    });

                }


                //Yarn
                var yarndList = new List<Sample_FabricPlan>();
                if (PlanSamEnty.SamYarnItemDet != null)
                {
                    foreach (var PYarnItem in PlanSamEnty.SamYarnItemDet)
                    {

                        int? BCID = 0;

                        if (PYarnItem.BColorID == 0)
                        {
                            BCID = null;
                        }
                        else
                        {
                            BCID = PYarnItem.BColorID;
                        }

                        int? FCID = 0;

                        if (PYarnItem.FColorID == 0)
                        {
                            FCID = null;
                        }
                        else
                        {
                            FCID = PYarnItem.FColorID;
                        }
                        int? PCID = 0;
                        if (PYarnItem.PrintColorID == 0)
                        {
                            PCID = null;
                        }
                        else
                        {
                            PCID = PYarnItem.PrintColorID;
                        }


                        yarndList.Add(new Sample_FabricPlan
                        {
                            SampleJobNo = PYarnItem.SampleJobNo,
                            ItemID = PYarnItem.YItemID,
                            BColorID = BCID,//PYarnItem.BColorID,
                            FColorID = FCID,//PYarnItem.FColorID,
                            SizeID = PYarnItem.SizeID,
                            ProgramQty = PYarnItem.ProgramQty,
                            PrintColorId = PCID,//PYarnItem.PrintColorID,
                            BPurQty = PYarnItem.BPurQty,
                            FPurQty = PYarnItem.FPurQty,
                            FabricID = PYarnItem.FabItemID,
                            YSNo = PYarnItem.YSNo,
                            FSNo = PYarnItem.SNo,

                        });

                    }
                }


                var result = PlanSamRep.AddDetItemData(FabList, yarndList, PlanSamEnty.CompanyID, PlanSamEnty.CompanyUnitID, PlanSamEnty.EDate, PlanSamEnty.Order_No, PlanSamEnty.Job_Ord_No);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<PlanningSampleMain>> GetDataEditSamPlanDetails(int StyRowId)
        {
            try
            {
                var ProductWO = PlanSamRep.GetDataEditSamRepPlanDetails(StyRowId);

                return new Response<IQueryable<PlanningSampleMain>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<PlanningSampleMain>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<PlanningSampleFabricDet>> GetFabEditDetails(int StyleRowId, string OType)
        {
            try
            {
                var CurDetList = PlanSamRep.GetRepFabDetList(StyleRowId, OType);

                return new Response<IList<PlanningSampleFabricDet>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningSampleFabricDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<PlanningSampleFabricDet>> GetYarnEditDetails(int StyleRowId, string OType)
        {
            try
            {
                var CurDetList = PlanSamRep.GetRepYarnDetList(StyleRowId, OType);

                return new Response<IList<PlanningSampleFabricDet>>(CurDetList, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception ex)
            {
                return new Response<IList<PlanningSampleFabricDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateSPlanEntry(PlanningSampleMain SEEntry)
        {
            try
            {

                var EFabList = new List<Sample_FabricPlan>();

                foreach (var PFItem in SEEntry.SamFabricItemDet)
                {

                    int? BCID = 0;

                    if (PFItem.BColorID == 0)
                    {
                        BCID = null;
                    }
                    else
                    {
                        BCID = PFItem.BColorID;
                    }

                    int? FCID = 0;

                    if (PFItem.FColorID == 0)
                    {
                        FCID = null;
                    }
                    else
                    {
                        FCID = PFItem.FColorID;
                    }

                    int? PCID = 0;

                    if (PFItem.PrintColorID == 0)
                    {
                        PCID = null;
                    }
                    else
                    {
                        PCID = PFItem.PrintColorID;
                    }


                    EFabList.Add(new Sample_FabricPlan
                    {
                        SampleJobNo = PFItem.SampleJobNo,
                        ItemID = PFItem.FabItemID,
                        BColorID = BCID,//PFItem.BColorID,
                        FColorID = FCID,//PFItem.FColorID,
                        SizeID = PFItem.SizeID,
                        ProgramQty = PFItem.ProgramQty,
                        PrintColorId = PCID,// PFItem.PrintColorID,                   
                        BPurQty = PFItem.BPurQty,
                        FPurQty = PFItem.FPurQty,
                        FSNo = PFItem.SNo,
                    });

                }


                //Yarn
                var EyarndList = new List<Sample_FabricPlan>();
                if (SEEntry.SamYarnItemDet != null)
                {
                    foreach (var PYarnItem in SEEntry.SamYarnItemDet)
                    {

                        int? BCID = 0;

                        if (PYarnItem.BColorID == 0)
                        {
                            BCID = null;
                        }
                        else
                        {
                            BCID = PYarnItem.BColorID;
                        }

                        int? FCID = 0;

                        if (PYarnItem.FColorID == 0)
                        {
                            FCID = null;
                        }
                        else
                        {
                            FCID = PYarnItem.FColorID;
                        }
                        int? PCID = 0;
                        if (PYarnItem.PrintColorID == 0)
                        {
                            PCID = null;
                        }
                        else
                        {
                            PCID = PYarnItem.PrintColorID;
                        }


                        EyarndList.Add(new Sample_FabricPlan
                        {
                            SampleJobNo = PYarnItem.SampleJobNo,
                            ItemID = PYarnItem.YItemID,
                            BColorID = BCID,//PYarnItem.BColorID,
                            FColorID = FCID,//PYarnItem.FColorID,
                            SizeID = PYarnItem.SizeID,
                            ProgramQty = PYarnItem.ProgramQty,
                            PrintColorId = PCID,//PYarnItem.PrintColorID,
                            BPurQty = PYarnItem.BPurQty,
                            FPurQty = PYarnItem.FPurQty,
                            FabricID = PYarnItem.FabItemID,
                            YSNo = PYarnItem.YSNo,
                            FSNo = PYarnItem.SNo,

                        });

                    }
                }


                var result = PlanSamRep.UpdateDetItemData(EFabList, EyarndList, SEEntry.CompanyID, SEEntry.CompanyUnitID, SEEntry.EDate, SEEntry.Order_No, SEEntry.Job_Ord_No);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteSPlanEntry(PlanningSampleMain SDEntry)
        {
            try
            {

                var DFabList = new List<Sample_FabricPlan>();

                foreach (var PFItem in SDEntry.SamFabricItemDet)
                {

                    int? BCID = 0;

                    if (PFItem.BColorID == 0)
                    {
                        BCID = null;
                    }
                    else
                    {
                        BCID = PFItem.BColorID;
                    }

                    int? FCID = 0;

                    if (PFItem.FColorID == 0)
                    {
                        FCID = null;
                    }
                    else
                    {
                        FCID = PFItem.FColorID;
                    }

                    int? PCID = 0;

                    if (PFItem.PrintColorID == 0)
                    {
                        PCID = null;
                    }
                    else
                    {
                        PCID = PFItem.PrintColorID;
                    }


                    DFabList.Add(new Sample_FabricPlan
                    {
                        SampleJobNo = PFItem.SampleJobNo,
                        ItemID = PFItem.FabItemID,
                        BColorID = BCID,//PFItem.BColorID,
                        FColorID = FCID,//PFItem.FColorID,
                        SizeID = PFItem.SizeID,
                        ProgramQty = PFItem.ProgramQty,
                        PrintColorId = PCID,// PFItem.PrintColorID,                   
                        BPurQty = PFItem.BPurQty,
                        FPurQty = PFItem.FPurQty,
                        FSNo = PFItem.SNo,
                    });

                }


                //Yarn
                var DyarndList = new List<Sample_FabricPlan>();
                if (SDEntry.SamYarnItemDet != null)
                {
                    foreach (var PYarnItem in SDEntry.SamYarnItemDet)
                    {

                        int? BCID = 0;

                        if (PYarnItem.BColorID == 0)
                        {
                            BCID = null;
                        }
                        else
                        {
                            BCID = PYarnItem.BColorID;
                        }

                        int? FCID = 0;

                        if (PYarnItem.FColorID == 0)
                        {
                            FCID = null;
                        }
                        else
                        {
                            FCID = PYarnItem.FColorID;
                        }
                        int? PCID = 0;
                        if (PYarnItem.PrintColorID == 0)
                        {
                            PCID = null;
                        }
                        else
                        {
                            PCID = PYarnItem.PrintColorID;
                        }


                        DyarndList.Add(new Sample_FabricPlan
                        {
                            SampleJobNo = PYarnItem.SampleJobNo,
                            ItemID = PYarnItem.YItemID,
                            BColorID = BCID,//PYarnItem.BColorID,
                            FColorID = FCID,//PYarnItem.FColorID,
                            SizeID = PYarnItem.SizeID,
                            ProgramQty = PYarnItem.ProgramQty,
                            PrintColorId = PCID,//PYarnItem.PrintColorID,
                            BPurQty = PYarnItem.BPurQty,
                            FPurQty = PYarnItem.FPurQty,
                            FabricID = PYarnItem.FabItemID,
                            YSNo = PYarnItem.YSNo,
                            FSNo = PYarnItem.SNo,

                        });

                    }
                }


                var result = PlanSamRep.DeleteDetItemData(DFabList, DyarndList, SDEntry.CompanyID, SDEntry.CompanyUnitID, SDEntry.EDate, SDEntry.Order_No, SDEntry.Job_Ord_No);


                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
