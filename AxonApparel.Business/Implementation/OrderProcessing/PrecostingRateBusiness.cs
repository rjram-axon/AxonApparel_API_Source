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
    public class PrecostingRateBusiness : IPrecostingRateBusiness
    {
        IPrecostingRateRepository PrecostRep = new PrecostingRateRepository();

        public Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsAddDetails(int Id)
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
        public Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostrateTrimsEditDetails(int Id)
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

        public Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentAddDetails(int Id)
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
        public Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostrateEmblishmentEditDetails(int Id)
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

        public Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnAddDetails(int Id)
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
        public Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostrateFabricYarnEditDetails(int Id)
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

        public Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessAddDetails(int Id)
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
        public Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostrateprocessEditDetails(int Id)
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

        public Response<bool> CreateEntry(PrecostingFabTrim_mas MEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
            int? ItmId = 0;
            int? Buyerid = 0;
            int? Styleid = 0;
            int? GItemid = 0;
            int? Colorid = 0;
            int? Sizeid = 0;
            int? UOMid = 0;

            if (MEntry.Bmasid == 0)
            {
                BMasID = null;
            }
            else
            {
                BMasID = MEntry.Bmasid;
            }
            if (MEntry.Stylerowid == 0)
            {
                StyRowID = null;
            }
            else
            {
                StyRowID = MEntry.Stylerowid;
            }
            if (MEntry.Buyerid == 0)
            {
                Buyerid = null;
            }
            else
            {
                Buyerid = MEntry.Buyerid;
            }
            if (MEntry.Styleid == 0)
            {
                Styleid = null;
            }
            else
            {
                Styleid = MEntry.Styleid;
            }

            try
            {

                AxonApparel.Repository.PreCostingFabTrim_mas Precostmas = new AxonApparel.Repository.PreCostingFabTrim_mas
                {

                    Bmasid = BMasID,
                    Stylerowid = StyRowID,
                    Styleid = Styleid,
                    Buyerid = Buyerid,
                    RateEntrydate = MEntry.RateEntrydate,
                    PrecostFabTrimmasid = MEntry.PrecostFabTrimmasid
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
                        Rate = trim.Rate
                    });

                }

                var FablistDetails = new List<PreCostingFabric_Det>();

                if (MEntry.FabricDet != null)
                {
                    foreach (var Fabdetails in MEntry.FabricDet)
                    {

                        FablistDetails.Add(new PreCostingFabric_Det
                        {
                            PrecostFabricmasid = Fabdetails.PrecostFabricmasid,
                            PrecostFabTrimmasid = Fabdetails.PrecostFabTrimmasid,
                            GItemid = Fabdetails.GItemid,
                            Componentid = Fabdetails.Componentid,
                            Fabricid = Fabdetails.Fabricid,
                            Greycolorid = Fabdetails.Greycolorid,
                            Finishcolorid = Fabdetails.Finishcolorid,
                            Printcolorid = Fabdetails.Printcolorid,
                            GSM = Fabdetails.GSM,
                            Grammage = Fabdetails.Grammage
                        });
                    }
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
                            Rate = Embdetails.Rate
                        });
                    }
                }
                var FabdetDetails = new List<Repository.PrecostFabDept_Fab>();

                if (MEntry.PrecostFab != null)
                {
                    foreach (var Fabdetails in MEntry.PrecostFab)
                    {
                        if (Fabdetails.Type !="Yarn")
                        {
                        FabdetDetails.Add(new Repository.PrecostFabDept_Fab
                        {
                            PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                            Fabricid = Fabdetails.Fabricid,
                            FabricColorid = Fabdetails.FabricColorid,
                            Rate = Fabdetails.Rate
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
                                PreCostFabDeptYarnmasid=Fabdetails.PreCostFabDeptYarnmasid,
                                Fabricid = Fabdetails.Fabricid,
                                Colorid = Fabdetails.FabricColorid,
                                Countid=Fabdetails.Sizeid,
                                Rate = Fabdetails.Rate
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
                            Rate = procdetails.Rate
                        });
                    }
                }

                var result = PrecostRep.UpdateDetData(Precostmas, TrimList, FablistDetails, EmblistDetails, FabdetDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEntry(PrecostingFabTrim_mas MEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
            int? ItmId = 0;
            int? Buyerid = 0;
            int? Styleid = 0;
            int? GItemid = 0;
            int? Colorid = 0;
            int? Sizeid = 0;
            int? UOMid = 0;

            if (MEntry.Bmasid == 0)
            {
                BMasID = null;
            }
            else
            {
                BMasID = MEntry.Bmasid;
            }
            if (MEntry.Stylerowid == 0)
            {
                StyRowID = null;
            }
            else
            {
                StyRowID = MEntry.Stylerowid;
            }
            if (MEntry.Buyerid == 0)
            {
                Buyerid = null;
            }
            else
            {
                Buyerid = MEntry.Buyerid;
            }
            if (MEntry.Styleid == 0)
            {
                Styleid = null;
            }
            else
            {
                Styleid = MEntry.Styleid;
            }

            try
            {

                AxonApparel.Repository.PreCostingFabTrim_mas Precostmas = new AxonApparel.Repository.PreCostingFabTrim_mas
                {

                    Bmasid = BMasID,
                    Stylerowid = StyRowID,
                    Styleid = Styleid,
                    Buyerid = Buyerid,
                    RateEntrydate = MEntry.RateEntrydate,
                    PrecostFabTrimmasid = MEntry.PrecostFabTrimmasid
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
                        Rate = trim.Rate
                    });

                }

                var FablistDetails = new List<PreCostingFabric_Det>();

                if (MEntry.FabricDet != null)
                {
                    foreach (var Fabdetails in MEntry.FabricDet)
                    {

                        FablistDetails.Add(new PreCostingFabric_Det
                        {
                            PrecostFabricmasid = Fabdetails.PrecostFabricmasid,
                            PrecostFabTrimmasid = Fabdetails.PrecostFabTrimmasid,
                            GItemid = Fabdetails.GItemid,
                            Componentid = Fabdetails.Componentid,
                            Fabricid = Fabdetails.Fabricid,
                            Greycolorid = Fabdetails.Greycolorid,
                            Finishcolorid = Fabdetails.Finishcolorid,
                            Printcolorid = Fabdetails.Printcolorid,
                            GSM = Fabdetails.GSM,
                            Grammage = Fabdetails.Grammage
                        });
                    }
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
                            Rate = Embdetails.Rate
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
                                Rate = Fabdetails.Rate
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
                                Rate = Fabdetails.Rate
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
                            Rate = procdetails.Rate
                        });
                    }
                }

                var result = PrecostRep.DeleteDetData(Precostmas, TrimList, FablistDetails, EmblistDetails, FabdetDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
