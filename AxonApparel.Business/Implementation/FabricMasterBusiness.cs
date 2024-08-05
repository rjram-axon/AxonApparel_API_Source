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
    public class FabricMasterBusiness : IFabricMasterBusiness
    {
        IFabricMasterRepository FabmasRep = new FabricMasterRepository();


        public Response<IQueryable<Domain.FabricMaster>> GetFabricmasDetails(int Id)
        {
            try
            {
                var ProductWO = FabmasRep.GetFabricmasDetails(Id);

                return new Response<IQueryable<Domain.FabricMaster>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricMaster>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.FabricMaster>> GetFabricEditDetails(int Id)
        {
            try
            {
                var ProductWO = FabmasRep.GetFabricEditDetails(Id);

                return new Response<IQueryable<Domain.FabricMaster>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricMaster>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.FabricMaster>> GetFabricdetfromyarn(int itemid, int colorid, int sizeid)
        {
            try
            {
                var ProductWO = FabmasRep.GetFabricdetfromyarn(itemid, colorid, sizeid);

                return new Response<IQueryable<Domain.FabricMaster>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricMaster>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.FabricYarn>> GetFabricyarnEditDetails(int Id)
        {
            try
            {
                var ProductWO = FabmasRep.GetFabricyarnEditDetails(Id);

                return new Response<IQueryable<Domain.FabricYarn>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricYarn>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.FabricProcess>> GetFabricprocessEditDetails(int Id)
        {
            try
            {
                var ProductWO = FabmasRep.GetFabricprocessEditDetails(Id);

                return new Response<IQueryable<Domain.FabricProcess>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricProcess>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.FabricMaster>> GetFabricMainDetails()
        {
            try
            {
                var ProductWO = FabmasRep.GetFabricMainDetails();

                return new Response<IQueryable<Domain.FabricMaster>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.FabricMaster>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> CreateEntry(Domain.FabricMaster MEntry)
        {
           
            try
            {

                AxonApparel.Repository.FabricMaster fabmas = new AxonApparel.Repository.FabricMaster
                {

                    Fabricid = MEntry.Fabricid,
                    Fabricmasid = MEntry.Fabricmasid,
                    FromGSM = MEntry.FromGSM,
                    ToGSM = MEntry.ToGSM,
                };

                var YarnList = new List<Repository.FabricYarn>();
                if (MEntry.FabricYarn != null)
                {
                    foreach (var trim in MEntry.FabricYarn)
                    {
                        YarnList.Add(new Repository.FabricYarn
                        {
                            FabricYarnmasid = trim.FabricYarnmasid,
                            Fabricmasid = trim.Fabricmasid,
                            Yarnid = trim.Yarnid,
                            Countid = trim.Countid,
                            Colorid = trim.Colorid,
                            Percentage = trim.Percentage,         
                        });
                    }
                }

                var ProcDetails = new List<Repository.FabricProcess>();

                if (MEntry.FabricProcess != null)
                {
                    foreach (var Fabdetails in MEntry.FabricProcess)
                    {

                        ProcDetails.Add(new Repository.FabricProcess
                        {
                            FabricProcessmasid = Fabdetails.FabricProcessmasid,
                            Fabricmasid = Fabdetails.Fabricmasid,
                            Processid = Fabdetails.Processid,
                            LossPercentage = Fabdetails.LossPercentage,
                            Rate = Fabdetails.Rate,
                          
                        });
                    }
                }


                var result = FabmasRep.AddDetData(fabmas, YarnList, ProcDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateEntry(Domain.FabricMaster MEntry)
        {

            try
            {

                AxonApparel.Repository.FabricMaster fabmas = new AxonApparel.Repository.FabricMaster
                {

                    Fabricid = MEntry.Fabricid,
                    Fabricmasid = MEntry.Fabricmasid,
                    FromGSM = MEntry.FromGSM,
                    ToGSM = MEntry.ToGSM,
                };

                var YarnList = new List<Repository.FabricYarn>();
                if (MEntry.FabricYarn != null)
                {
                    foreach (var trim in MEntry.FabricYarn)
                    {
                        YarnList.Add(new Repository.FabricYarn
                        {
                            FabricYarnmasid = trim.FabricYarnmasid,
                            Fabricmasid = trim.Fabricmasid,
                            Yarnid = trim.Yarnid,
                            Countid = trim.Countid,
                            Colorid = trim.Colorid,
                            Percentage = trim.Percentage,
                        });
                    }
                }

                var ProcDetails = new List<Repository.FabricProcess>();

                if (MEntry.FabricProcess != null)
                {
                    foreach (var Fabdetails in MEntry.FabricProcess)
                    {

                        ProcDetails.Add(new Repository.FabricProcess
                        {
                            FabricProcessmasid = Fabdetails.FabricProcessmasid,
                            Fabricmasid = Fabdetails.Fabricmasid,
                            Processid = Fabdetails.Processid,
                            LossPercentage = Fabdetails.LossPercentage,
                            Rate = Fabdetails.Rate,

                        });
                    }
                }


                var result = FabmasRep.UpdateDetData(fabmas, YarnList, ProcDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteEntry(Domain.FabricMaster MEntry)
        {

            try
            {

                AxonApparel.Repository.FabricMaster fabmas = new AxonApparel.Repository.FabricMaster
                {

                    Fabricid = MEntry.Fabricid,
                    Fabricmasid = MEntry.Fabricmasid,
                    FromGSM = MEntry.FromGSM,
                    ToGSM = MEntry.ToGSM,
                };

                var YarnList = new List<Repository.FabricYarn>();
                if (MEntry.FabricYarn != null)
                {
                    foreach (var trim in MEntry.FabricYarn)
                    {
                        YarnList.Add(new Repository.FabricYarn
                        {
                            FabricYarnmasid = trim.FabricYarnmasid,
                            Fabricmasid = trim.Fabricmasid,
                            Yarnid = trim.Yarnid,
                            Countid = trim.Countid,
                            Colorid = trim.Colorid,
                            Percentage = trim.Percentage,
                        });
                    }
                }

                var ProcDetails = new List<Repository.FabricProcess>();

                if (MEntry.FabricProcess != null)
                {
                    foreach (var Fabdetails in MEntry.FabricProcess)
                    {

                        ProcDetails.Add(new Repository.FabricProcess
                        {
                            FabricProcessmasid = Fabdetails.FabricProcessmasid,
                            Fabricmasid = Fabdetails.Fabricmasid,
                            Processid = Fabdetails.Processid,
                            LossPercentage = Fabdetails.LossPercentage,
                            Rate = Fabdetails.Rate,

                        });
                    }
                }


                var result = FabmasRep.DeleteDetData(fabmas, YarnList, ProcDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

    }
}
