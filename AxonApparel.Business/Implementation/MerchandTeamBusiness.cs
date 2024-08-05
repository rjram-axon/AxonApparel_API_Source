using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class MerchandTeamBusiness:IMerchandTeamBusiness
    {
        private IMerchandTeamRepository MercTeamRepo = new MerchandTeamRepository();

        public Response<IQueryable<Domain.MerchandTeamMas>> GetMerchandTemplate()
        {
            try
            {
                var ProductWO = MercTeamRepo.GetDataMainList();

                return new Response<IQueryable<Domain.MerchandTeamMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MerchandTeamMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateMerchandiserTeam(Domain.MerchandTeamMas MercTeamMas)
        {
            try
            {
                var MerchandiserBuyer = new List<Repository.MerchTeamBuyer>();

                foreach (var mercbuyer in MercTeamMas.MerchandTeamBuy)
                {
                    MerchandiserBuyer.Add(new Repository.MerchTeamBuyer
                    {
                        BuyerId = mercbuyer.BuyerId,
                    });
                }

                var MerchandiserEmployee = new List<Repository.MerchTeamEmployee>();

                foreach (var mercemp in MercTeamMas.MerchandTeamEmp)
                {
                    MerchandiserEmployee.Add(new Repository.MerchTeamEmployee
                    {
                        EmployeeId = mercemp.EmployeeId,
                    });
                }

                var MerchandiserTeamId = MercTeamRepo.AddData(new Repository.MerchTeamMas
                {
                    MerchandName = MercTeamMas.MerchandName,
                    MerchTeamBuyer = MerchandiserBuyer,
                    MerchTeamEmployee = MerchandiserEmployee,
                });

                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<Domain.MerchandTeamMas> GetDataById(int TeamId)
        {
            try
            {
                var sty = MercTeamRepo.GetMerchTeamHeaderInfo(TeamId);

                return new Response<Domain.MerchandTeamMas>(new Domain.MerchandTeamMas
                {
                    MerchandMasId = sty.TeamId,
                    MerchandName = sty.MerchandName,
                    
                    MerchandTeamBuy = sty.MerchTeamBuyer.Select(h => new Domain.MerchandTeamBuyer()
                    {
                        TeamId =(int) h.TeamId,
                        BuyerId = (int)h.BuyerId,
                        Buyer=h.Buyer.Buyer1,
                        Sno=0,
                    }).Where(x => x.TeamId == TeamId).ToList(),

                    MerchandTeamEmp = sty.MerchTeamEmployee.Select(h => new Domain.MerchandTeamEmployee()
                    {
                        TeamId =(int) h.TeamId,
                        EmployeeId = (int)h.EmployeeId,
                        Employee = h.Employee.Employee1,
                        Sno = 0,
                    }).Where(x => x.TeamId == TeamId).ToList(),

                }, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<Domain.MerchandTeamMas>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateMerchandTeam(Domain.MerchandTeamMas MerTeamUpd)
        {
            //MerchTeamBuyer Begin
            var MerchandiserBuyer = new List<Repository.MerchTeamBuyer>();

            foreach (var mercbuyer in MerTeamUpd.MerchandTeamBuy)
            {
                MerchandiserBuyer.Add(new Repository.MerchTeamBuyer
                {
                    BuyerId = mercbuyer.BuyerId,
                });
            }
            //MerchTeamBuyer End

            //MerchTeamEmployee Begin
            var MerchandiserEmployee = new List<Repository.MerchTeamEmployee>();

            foreach (var mercemp in MerTeamUpd.MerchandTeamEmp)
            {
                MerchandiserEmployee.Add(new Repository.MerchTeamEmployee
                {
                    EmployeeId = mercemp.EmployeeId,
                });
            }            
            //MerchTeamEmployee End

            var res = MercTeamRepo.UpdateData(new Repository.MerchTeamMas
            {
                TeamId=MerTeamUpd.MerchandMasId,
                MerchandName = MerTeamUpd.MerchandName,
                MerchTeamBuyer = MerchandiserBuyer,
                MerchTeamEmployee = MerchandiserEmployee,
            });

            return new Response<bool>(true, Status.SUCCESS, "Saved Successfully");
        }

        public Response<bool> Delete(int MercId)
        {
            return new Response<bool>(MercTeamRepo.DeleteData(MercId), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
