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
    public class PrecostingTargetBusiness : IPrecostingTargetBusiness
    {
        IPrecostingTargetRepository PrecostRep = new PrecostingTargetRepository();

        public Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsAddDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateTrimsAddDetails(Id);

                return new Response<IQueryable<Domain.PrecostingTrim_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingTrim_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsEditDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateTrimsEditDetails(Id);

                return new Response<IQueryable<Domain.PrecostingTrim_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingTrim_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostrateFabricAddDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateFabricAddDetails(Id);

                return new Response<IQueryable<Domain.PrecostingFabric_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingFabric_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostrateFabricEditDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateFabricEditDetails(Id);

                return new Response<IQueryable<Domain.PrecostingFabric_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingFabric_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentAddDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateEmblishmentAddDetails(Id);

                return new Response<IQueryable<Domain.PreCostingEmbellishment_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PreCostingEmbellishment_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentEditDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateEmblishmentEditDetails(Id);

                return new Response<IQueryable<Domain.PreCostingEmbellishment_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PreCostingEmbellishment_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnAddDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateFabricYarnAddDetails(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnEditDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateFabricYarnEditDetails(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessAddDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateprocessAddDetails(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Process>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessEditDetails(string Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostrateprocessEditDetails(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Process>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateEntry(Domain.Precosting_Target_mas MEntry)
        {
            string BMasID = "";
            int? ItmId = 0;
            int? GItemid = 0;
            int? Colorid = 0;
            int? Sizeid = 0;
            int? UOMid = 0;
            

            if (MEntry.BMasid == "")
            {
                BMasID = null;
            }
            else
            {
                BMasID = MEntry.BMasid;
            }
          
            

            try
            {

                AxonApparel.Repository.Precosting_Target_mas Precostmas = new AxonApparel.Repository.Precosting_Target_mas
                {

                    BMasid = BMasID,
                    EntryDate = MEntry.EntryDate,
                    TargetNo=MEntry.TargetNo,
                    Targetmasid = MEntry.Targetmasid
                };

                var TrimList = new List<PreCostingTrim_Det>();

                foreach (var trim in MEntry.TrimsDet)
                {
                    if (trim.Itemid == 0)
                    {
                        ItmId = null;
                    }
                    else
                    {
                        ItmId = trim.Itemid;
                    }
                    if (trim.GItemid == 0)
                    {
                        GItemid = null;
                    }
                    else
                    {
                        GItemid = trim.GItemid;
                    }
                    if (trim.Colorid == 0)
                    {
                        Colorid = null;
                    }
                    else
                    {
                        Colorid = trim.Colorid;
                    }
                    if (trim.Sizeid == 0)
                    {
                        Sizeid = null;
                    }
                    else
                    {
                        Sizeid = trim.Sizeid;
                    }
                    if (trim.UOMid == 0)
                    {
                        UOMid = null;
                    }
                    else
                    {
                        UOMid = trim.UOMid;
                    }


                    TrimList.Add(new PreCostingTrim_Det
                    {
                        PrecostTrimmasid = trim.PrecostTrimmasid,
                        PrecostFabTrimmasid = trim.PrecostFabTrimmasid,
                        Itemid = (int)ItmId,
                        Colorid = (int)Colorid,
                        Sizeid = (int)Sizeid,
                        UOMid = (int)UOMid,
                        GItemid = (int)GItemid,
                        Consumption = trim.Consumption,
                        Rate = trim.Rate,
                        Target = trim.Target,
                        Approved=trim.Approved
                    });

                }

               
                var EmblistDetails = new List<Repository.PreCostingEmbellishment_Det>();

                if (MEntry.EmbellishmentDet != null)
                {
                    foreach (var Embdetails in MEntry.EmbellishmentDet)
                    {

                        EmblistDetails.Add(new Repository.PreCostingEmbellishment_Det
                        {
                            PrecostEmbellishmentmasid = Embdetails.PrecostEmbellishmentmasid,
                            PrecostFabTrimmasid = Embdetails.PrecostFabTrimmasid,
                            Processid = Embdetails.Processid,
                            GItemid = Embdetails.GItemid,
                            Rate = Embdetails.Rate,
                            Target = Embdetails.Target,
                            Approved = Embdetails.Approved
                        });
                    }
                }
                var FabdetDetails = new List<Repository.PrecostFabDept_Fab>();

                if (MEntry.PrecostFab != null)
                {
                    foreach (var Fabdetails in MEntry.PrecostFab)
                    {
                        if (Fabdetails.Type != "Yarn")
                        {
                            FabdetDetails.Add(new Repository.PrecostFabDept_Fab
                            {
                                PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                                Fabricid = Fabdetails.Fabricid,
                                FabricColorid = Fabdetails.FabricColorid,
                                Rate = Fabdetails.Rate,
                                Target = Fabdetails.Target,
                                Approved = Fabdetails.Approved
                            });
                        }
                    }
                }
                var yarnlistDetails = new List<Repository.PrecostFabDept_Yarn>();

                if (MEntry.PrecostFab != null)
                {
                    foreach (var Fabdetails in MEntry.PrecostFab)
                    {
                        if (Fabdetails.Type == "Yarn")
                        {
                            yarnlistDetails.Add(new Repository.PrecostFabDept_Yarn
                            {
                                PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                                PreCostFabDeptYarnmasid = Fabdetails.PreCostFabDeptYarnmasid,
                                Fabricid = Fabdetails.Fabricid,
                                Colorid = Fabdetails.FabricColorid,
                                Countid = Fabdetails.Sizeid,
                                Rate = Fabdetails.Rate,
                                Target = Fabdetails.Target,
                                Approved = Fabdetails.Approved
                            });
                        }
                    }
                }
                var ProcessDetails = new List<Repository.PrecostFabDept_Process>();

                if (MEntry.ProcessDet != null)
                {
                    foreach (var procdetails in MEntry.ProcessDet)
                    {

                        ProcessDetails.Add(new Repository.PrecostFabDept_Process
                        {
                            PreCostFabDeptProcmasid = procdetails.PreCostFabDeptProcmasid,
                            PreCostFabDeptmasid = procdetails.PreCostFabDeptmasid,
                            PreCostFabDeptFabmasid = procdetails.PreCostFabDeptFabmasid,
                            Fabricid = procdetails.Fabricid,
                            Processid = procdetails.Processid,
                            LossPercentage = procdetails.LossPercentage,
                            Rate = procdetails.Rate,
                            Target = procdetails.Target,
                            Approved = procdetails.Approved
                        });
                    }
                }

                var result = PrecostRep.UpdateDetData(Precostmas, TrimList, EmblistDetails, FabdetDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEntry(Domain.Precosting_Target_mas MEntry)
        {
            string BMasID = "";
            int? ItmId = 0;
            int? GItemid = 0;
            int? Colorid = 0;
            int? Sizeid = 0;
            int? UOMid = 0;


            if (MEntry.BMasid == "")
            {
                BMasID = null;
            }
            else
            {
                BMasID = MEntry.BMasid;
            }



            try
            {

                AxonApparel.Repository.Precosting_Target_mas Precostmas = new AxonApparel.Repository.Precosting_Target_mas
                {

                    BMasid = BMasID,
                    EntryDate = MEntry.EntryDate,
                    Targetmasid = MEntry.Targetmasid
                };

                var TrimList = new List<PreCostingTrim_Det>();

                foreach (var trim in MEntry.TrimsDet)
                {
                    if (trim.Itemid == 0)
                    {
                        ItmId = null;
                    }
                    else
                    {
                        ItmId = trim.Itemid;
                    }
                    if (trim.GItemid == 0)
                    {
                        GItemid = null;
                    }
                    else
                    {
                        GItemid = trim.GItemid;
                    }
                    if (trim.Colorid == 0)
                    {
                        Colorid = null;
                    }
                    else
                    {
                        Colorid = trim.Colorid;
                    }
                    if (trim.Sizeid == 0)
                    {
                        Sizeid = null;
                    }
                    else
                    {
                        Sizeid = trim.Sizeid;
                    }
                    if (trim.UOMid == 0)
                    {
                        UOMid = null;
                    }
                    else
                    {
                        UOMid = trim.UOMid;
                    }


                    TrimList.Add(new PreCostingTrim_Det
                    {
                        PrecostTrimmasid = trim.PrecostTrimmasid,
                        PrecostFabTrimmasid = trim.PrecostFabTrimmasid,
                        Itemid = (int)ItmId,
                        Colorid = (int)Colorid,
                        Sizeid = (int)Sizeid,
                        UOMid = (int)UOMid,
                        GItemid = (int)GItemid,
                        Consumption = trim.Consumption,
                        Rate = trim.Rate,
                        Target = trim.Target,
                        Approved = trim.Approved
                    });

                }


                var EmblistDetails = new List<Repository.PreCostingEmbellishment_Det>();

                if (MEntry.EmbellishmentDet != null)
                {
                    foreach (var Embdetails in MEntry.EmbellishmentDet)
                    {

                        EmblistDetails.Add(new Repository.PreCostingEmbellishment_Det
                        {
                            PrecostEmbellishmentmasid = Embdetails.PrecostEmbellishmentmasid,
                            PrecostFabTrimmasid = Embdetails.PrecostFabTrimmasid,
                            Processid = Embdetails.Processid,
                            GItemid = Embdetails.GItemid,
                            Rate = Embdetails.Rate,
                            Target = Embdetails.Target,
                            Approved = Embdetails.Approved
                        });
                    }
                }
                var FabdetDetails = new List<Repository.PrecostFabDept_Fab>();

                if (MEntry.PrecostFab != null)
                {
                    foreach (var Fabdetails in MEntry.PrecostFab)
                    {
                        if (Fabdetails.Type != "Yarn")
                        {
                            FabdetDetails.Add(new Repository.PrecostFabDept_Fab
                            {
                                PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                                Fabricid = Fabdetails.Fabricid,
                                FabricColorid = Fabdetails.FabricColorid,
                                Rate = Fabdetails.Rate,
                                Target = Fabdetails.Target,
                                Approved = Fabdetails.Approved
                            });
                        }
                    }
                }
                var yarnlistDetails = new List<Repository.PrecostFabDept_Yarn>();

                if (MEntry.PrecostFab != null)
                {
                    foreach (var Fabdetails in MEntry.PrecostFab)
                    {
                        if (Fabdetails.Type == "Yarn")
                        {
                            yarnlistDetails.Add(new Repository.PrecostFabDept_Yarn
                            {
                                PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                                PreCostFabDeptYarnmasid = Fabdetails.PreCostFabDeptYarnmasid,
                                Fabricid = Fabdetails.Fabricid,
                                Colorid = Fabdetails.FabricColorid,
                                Countid = Fabdetails.Sizeid,
                                Rate = Fabdetails.Rate,
                                Target = Fabdetails.Target,
                                Approved = Fabdetails.Approved
                            });
                        }
                    }
                }
                var ProcessDetails = new List<Repository.PrecostFabDept_Process>();

                if (MEntry.ProcessDet != null)
                {
                    foreach (var procdetails in MEntry.ProcessDet)
                    {

                        ProcessDetails.Add(new Repository.PrecostFabDept_Process
                        {
                            PreCostFabDeptProcmasid = procdetails.PreCostFabDeptProcmasid,
                            PreCostFabDeptmasid = procdetails.PreCostFabDeptmasid,
                            PreCostFabDeptFabmasid = procdetails.PreCostFabDeptFabmasid,
                            Fabricid = procdetails.Fabricid,
                            Processid = procdetails.Processid,
                            LossPercentage = procdetails.LossPercentage,
                            Rate = procdetails.Rate,
                            Target = procdetails.Target,
                            Approved = procdetails.Approved
                        });
                    }
                }

                var result = PrecostRep.DeleteDetData(Precostmas, TrimList, EmblistDetails, FabdetDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Precosting_Target_mas>> GetPrecostTargetListDetails(int? CmpId, string Order_No, string Ref_No, int? BuyId, string frmDate, string ToDate, string TargetNo)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostTargetListDetails(CmpId, Order_No, Ref_No, BuyId, frmDate, ToDate, TargetNo);

                return new Response<IQueryable<Domain.Precosting_Target_mas>>(ProductWO.Select(m => new Domain.Precosting_Target_mas
                {
                    Targetmasid = m.Targetmasid,
                    TargetNo = m.TargetNo,
                    EntryDate = (DateTime)m.EntryDate,
                    Approved = m.Approved,
                    BMasid=m.BMasid

                }), Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Precosting_Target_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.Precosting_Target_mas>> GetPrecostTargetDetails(int? Targetmasid)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostTargetDetails(Targetmasid);

                return new Response<IQueryable<Domain.Precosting_Target_mas>>(ProductWO.Select(m => new Domain.Precosting_Target_mas
                {
                    Targetmasid = m.Targetmasid,
                    TargetNo = m.TargetNo,
                    EntryDate = (DateTime)m.EntryDate,
                    Approved = m.Approved,
                    BMasid = m.BMasid

                }), Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.Precosting_Target_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
