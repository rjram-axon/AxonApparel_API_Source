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
    public class PrecostingBusiness : IPrecostingBusiness
    {
        IPrecostingRepository PrecostRep = new PrecostingRepository();

        public Response<IQueryable<Domain.PrecostingFabTrim_mas>> GetPrecostingDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostingDetails(Id);

                return new Response<IQueryable<Domain.PrecostingFabTrim_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingFabTrim_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostTrimsEditDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostTrimsEditDetails(Id);

                return new Response<IQueryable<Domain.PrecostingTrim_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingTrim_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostingTrim_det>> GetPrecostTrimsAddDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostTrimsAddDetails(Id);

                return new Response<IQueryable<Domain.PrecostingTrim_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingTrim_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostingFabric_det>> GetPrecostfabricEditDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostfabricEditDetails(Id);

                return new Response<IQueryable<Domain.PrecostingFabric_det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostingFabric_det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PreCostingEmbellishment_Det>> GetPrecostEmblishmentEditDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostEmblishmentEditDetails(Id);

                return new Response<IQueryable<Domain.PreCostingEmbellishment_Det>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PreCostingEmbellishment_Det>>(null, Status.ERROR, "OOPS error occured. Plase try again");
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
                    Styleid=Styleid,
                    Buyerid=Buyerid,
                    Entrydate = MEntry.Entrydate,
                    
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
                            PrecostTrimmasid =trim.PrecostTrimmasid,
                            PrecostFabTrimmasid =trim.PrecostFabTrimmasid,
                            Itemid =(int)ItmId,
                            Colorid = (int)Colorid,
                            Sizeid = (int)Sizeid,
                            UOMid = (int)UOMid,
                            GItemid = (int)GItemid,
                        });
                    
                }

                var FablistDetails = new List<PreCostingFabric_Det>();

                if (MEntry.FabricDet != null)
                {
                    foreach (var Fabdetails in MEntry.FabricDet)
                    {

                        FablistDetails.Add(new PreCostingFabric_Det
                        {
                            PrecostFabricmasid =Fabdetails.PrecostFabricmasid,
                            PrecostFabTrimmasid =Fabdetails.PrecostFabTrimmasid,
                            GItemid =Fabdetails.GItemid,
                            Componentid =Fabdetails.Componentid,
                            Fabricid =Fabdetails.Fabricid,
                            Greycolorid =Fabdetails.Greycolorid,
                            Finishcolorid =Fabdetails.Finishcolorid,
                            Printcolorid =Fabdetails.Printcolorid,
                            GSM = Fabdetails.GSM

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
                            PrecostEmbellishmentmasid =Embdetails.PrecostEmbellishmentmasid,
                            PrecostFabTrimmasid =Embdetails.PrecostFabTrimmasid,
                            Processid =Embdetails.Processid,
                            GItemid =Embdetails.GItemid
                        });
                    }
                }

                var result = PrecostRep.AddDetData(Precostmas, TrimList, FablistDetails, EmblistDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateEntry(PrecostingFabTrim_mas MEntry)
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
                    Entrydate = MEntry.Entrydate,
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
                            GSM = Fabdetails.GSM

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
                            GItemid = Embdetails.GItemid
                        });
                    }
                }

                var result = PrecostRep.UpdateDetData(Precostmas, TrimList, FablistDetails, EmblistDetails);

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
                    Entrydate = MEntry.Entrydate,
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
                            GSM = Fabdetails.GSM

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
                            GItemid = Embdetails.GItemid
                        });
                    }
                }

                var result = PrecostRep.DeleteDetData(Precostmas, TrimList, FablistDetails, EmblistDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateTrimsEntry(PrecostingFabTrim_mas MEntry)
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
                    ConsumptionEntrydate = MEntry.ConsumptionEntrydate,
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
                        Consumption=trim.Consumption
                    });

                }

               

                var result = PrecostRep.AddTrimsDetData(Precostmas, TrimList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateTrimsEntry(PrecostingFabTrim_mas MEntry)
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
                    ConsumptionEntrydate = MEntry.ConsumptionEntrydate,
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
                        Consumption = trim.Consumption
                    });

                }


                var result = PrecostRep.AddTrimsDetData(Precostmas, TrimList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteTrimsEntry(PrecostingFabTrim_mas MEntry)
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
                    ConsumptionEntrydate = MEntry.ConsumptionEntrydate,
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
                        Consumption=trim.Consumption
                    });

                }

              

                var result = PrecostRep.DeleteTrimsDetData(Precostmas, TrimList);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
