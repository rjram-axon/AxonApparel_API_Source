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
    public class PrecostingFabdeptBusiness : IPrecostingFabdeptBusiness
    {
        IPrecostingFabdeptRepository PrecostRep = new PrecostingFabdeptRepository();

        public Response<IQueryable<Domain.PreCostFabDept_mas>> GetPrecostingmasDetails(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostingmasDetails(Id);

                return new Response<IQueryable<Domain.PreCostFabDept_mas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PreCostFabDept_mas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostingAddfabric(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostingAddfabric(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostFabDept_Fab>> GetPrecostingEditfabric(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostingEditfabric(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Fab>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostFabDept_Yarn>> GetPrecostingEditYarn(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostingEditYarn(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Yarn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Yarn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.PrecostFabDept_Process>> GetPrecostingEditprocess(int Id)
        {
            try
            {
                var ProductWO = PrecostRep.GetPrecostingEditprocess(Id);

                return new Response<IQueryable<Domain.PrecostFabDept_Process>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.PrecostFabDept_Process>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateEntry(Domain.PreCostFabDept_mas MEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
           
            int? Buyerid = 0;
            int? Styleid = 0;
            
            

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

                AxonApparel.Repository.PreCostFabDept_mas Precostfabmas = new AxonApparel.Repository.PreCostFabDept_mas
                {

                    Bmasid = BMasID,
                    Stylerowid = StyRowID,
                    Styleid = Styleid,
                    Buyerid = Buyerid,
                    Entrydate = MEntry.Entrydate,

                };

                var FablistDetails = new List<Repository.PrecostFabDept_Fab>();

                if (MEntry.FabDet != null)
                {
                    foreach (var Fabdetails in MEntry.FabDet)
                    {

                        FablistDetails.Add(new Repository.PrecostFabDept_Fab
                        {
                              PreCostFabDeptFabmasid =Fabdetails.PreCostFabDeptFabmasid,
                              PreCostFabDeptmasid =Fabdetails.PreCostFabDeptmasid,
                              Fabricid =Fabdetails.Fabricid,
                              GreyColorid =Fabdetails.GreyColorid,
                              FabricColorid =Fabdetails.FabricColorid,
                              PurchaseType =Fabdetails.PurchaseType,
                              Slno = Fabdetails.FabSlno,
                              GSM = Fabdetails.GSM

                        });
                    }
                }
                var yarnlistDetails = new List<Repository.PrecostFabDept_Yarn>();

                if (MEntry.YarnDet != null)
                {
                    foreach (var yandetails in MEntry.YarnDet)
                    {

                        yarnlistDetails.Add(new Repository.PrecostFabDept_Yarn
                        {
                             PreCostFabDeptYarnmasid= yandetails.PreCostFabDeptYarnmasid,
                             PreCostFabDeptmasid =yandetails.PreCostFabDeptmasid,
                             PreCostFabDeptFabmasid=yandetails.PreCostFabDeptFabmasid,
                             Fabricid =yandetails.Fabricid,
                             Yarnid =yandetails.Yarnid,
                             Countid =yandetails.Countid,
                             Colorid =yandetails.Colorid,
                             Percentage =yandetails.Percentage,
                             Slno=yandetails.FabSlno
                        });
                    }
                }
                var ProcessDetails = new List<Repository.PrecostFabDept_Process>();

                if (MEntry.ProcessDet != null)
                {
                    foreach (var procdetails in MEntry.ProcessDet)
                    {

                        ProcessDetails.Add(new Repository.PrecostFabDept_Process
                        {
                            PreCostFabDeptProcmasid =procdetails.PreCostFabDeptProcmasid,
                            PreCostFabDeptmasid =procdetails.PreCostFabDeptmasid,
                            PreCostFabDeptFabmasid =procdetails.PreCostFabDeptFabmasid,
                            Fabricid =procdetails.Fabricid,
                            Processid =procdetails.Processid,
                            LossPercentage = procdetails.LossPercentage,
                            Slno=procdetails.FabSlno
                        });
                    }
                }

                var result = PrecostRep.AddDetData(Precostfabmas, FablistDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateEntry(Domain.PreCostFabDept_mas MEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
            
            int? Buyerid = 0;
            int? Styleid = 0;
           

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

                AxonApparel.Repository.PreCostFabDept_mas Precostfabmas = new AxonApparel.Repository.PreCostFabDept_mas
                {

                    Bmasid = BMasID,
                    Stylerowid = StyRowID,
                    Styleid = Styleid,
                    Buyerid = Buyerid,
                    Entrydate = MEntry.Entrydate,
                    PreCostFabDeptmasid = MEntry.PreCostFabDeptmasid
                };

                var FablistDetails = new List<Repository.PrecostFabDept_Fab>();

                if (MEntry.FabDet != null)
                {
                    foreach (var Fabdetails in MEntry.FabDet)
                    {

                        FablistDetails.Add(new Repository.PrecostFabDept_Fab
                        {
                            PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                            PreCostFabDeptmasid = Fabdetails.PreCostFabDeptmasid,
                            Fabricid = Fabdetails.Fabricid,
                            GreyColorid = Fabdetails.GreyColorid,
                            FabricColorid = Fabdetails.FabricColorid,
                            PurchaseType = Fabdetails.PurchaseType,
                            Slno = Fabdetails.FabSlno,
                            GSM = Fabdetails.GSM
                        });
                    }
                }
                var yarnlistDetails = new List<Repository.PrecostFabDept_Yarn>();

                if (MEntry.YarnDet != null)
                {
                    foreach (var yandetails in MEntry.YarnDet)
                    {

                        yarnlistDetails.Add(new Repository.PrecostFabDept_Yarn
                        {
                            PreCostFabDeptYarnmasid = yandetails.PreCostFabDeptYarnmasid,
                            PreCostFabDeptmasid = yandetails.PreCostFabDeptmasid,
                            PreCostFabDeptFabmasid = yandetails.PreCostFabDeptFabmasid,
                            Fabricid = yandetails.Fabricid,
                            Yarnid = yandetails.Yarnid,
                            Countid = yandetails.Countid,
                            Colorid = yandetails.Colorid,
                            Percentage = yandetails.Percentage,
                            Slno=yandetails.FabSlno
                        });
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
                            Slno = procdetails.FabSlno
                        });
                    }
                }

                var result = PrecostRep.UpdateDetData(Precostfabmas, FablistDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEntry(Domain.PreCostFabDept_mas MEntry)
        {
            int? BMasID = 0;
            int? StyRowID = 0;
           
            int? Buyerid = 0;
            int? Styleid = 0;
            

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

                AxonApparel.Repository.PreCostFabDept_mas Precostfabmas = new AxonApparel.Repository.PreCostFabDept_mas
                {

                    Bmasid = BMasID,
                    Stylerowid = StyRowID,
                    Styleid = Styleid,
                    Buyerid = Buyerid,
                    Entrydate = MEntry.Entrydate,
                    PreCostFabDeptmasid = MEntry.PreCostFabDeptmasid
                };

                var FablistDetails = new List<Repository.PrecostFabDept_Fab>();

                if (MEntry.FabDet != null)
                {
                    foreach (var Fabdetails in MEntry.FabDet)
                    {

                        FablistDetails.Add(new Repository.PrecostFabDept_Fab
                        {
                            PreCostFabDeptFabmasid = Fabdetails.PreCostFabDeptFabmasid,
                            PreCostFabDeptmasid = Fabdetails.PreCostFabDeptmasid,
                            Fabricid = Fabdetails.Fabricid,
                            GreyColorid = Fabdetails.GreyColorid,
                            FabricColorid = Fabdetails.FabricColorid,
                            PurchaseType = Fabdetails.PurchaseType,
                            Slno = Fabdetails.FabSlno,
                            GSM = Fabdetails.GSM
                        });
                    }
                }
                var yarnlistDetails = new List<Repository.PrecostFabDept_Yarn>();

                if (MEntry.YarnDet != null)
                {
                    foreach (var yandetails in MEntry.YarnDet)
                    {

                        yarnlistDetails.Add(new Repository.PrecostFabDept_Yarn
                        {
                            PreCostFabDeptYarnmasid = yandetails.PreCostFabDeptYarnmasid,
                            PreCostFabDeptmasid = yandetails.PreCostFabDeptmasid,
                            PreCostFabDeptFabmasid = yandetails.PreCostFabDeptFabmasid,
                            Fabricid = yandetails.Fabricid,
                            Yarnid = yandetails.Yarnid,
                            Countid = yandetails.Countid,
                            Colorid = yandetails.Colorid,
                            Percentage = yandetails.Percentage,
                            Slno = yandetails.FabSlno,
                        });
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
                            Slno = procdetails.FabSlno,
                        });
                    }
                }

                var result = PrecostRep.DeleteDetData(Precostfabmas, FablistDetails, yarnlistDetails, ProcessDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
    }
}
