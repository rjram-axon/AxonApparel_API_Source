using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class ItemRateBusiness : IItemRateBusiness
    {

        private IItemRateRepository ItemRateRepo = new ItemRateRepository();

        public Response<bool> CreateItemRate(Domain.ItemRate Rate)
        {



            try
            {

                var RateListDetails = new List<Item_Rate>();

                foreach (var Acc in Rate.ItemRateDet)
                {
                    RateListDetails.Add(new Item_Rate
                    {
                        SizeId = Acc.SizeId,
                        Itemid = Acc.ItemId,
                        ColorId = Acc.ColorId,
                        SupplierId = Acc.SupplierId,
                        Rate = Acc.Rate,
                        Buyerid = Acc.BuyerId,
                    });
                }




                var result = ItemRateRepo.AddData(RateListDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }



        public Response<IQueryable<Domain.ItemRate>> GetItemRateTemplate()
        {
            try
            {
                var ProductWO = ItemRateRepo.GetDataMainList();

                return new Response<IQueryable<Domain.ItemRate>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.ItemRate>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.ItemRate>> GetRateEditBus(int id)
        {
            try
            {
                var ProductWO = ItemRateRepo.GetRepItemRate(id);


                return new Response<IList<Domain.ItemRate>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ItemRate>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<bool> UpdateItemRateEntry(Domain.ItemRate IEEntry)
        {
            try
            {
                
                var AccListDetails = new List<Item_Rate>();
                if (IEEntry.ItemRateDet != null)
                {
                    foreach (var Acc in IEEntry.ItemRateDet)
                    {
                        AccListDetails.Add(new Item_Rate
                        {
                            SizeId = Acc.SizeId,
                            Itemid = Acc.ItemId,
                            ColorId = Acc.ColorId,
                            SupplierId = Acc.SupplierId,
                            Rate = Acc.Rate,
                            Buyerid = Acc.BuyerId,
                            RateId = Acc.RateId

                        });
                    }
                }
           
                var result = ItemRateRepo.UpdateDetData(AccListDetails);

                //Edit Case                

                var AccLDetails = new List<Item_Rate>();
                if (IEEntry.ItemRateDet != null)
                {
                    foreach (var Acc in IEEntry.ItemRateDet)
                    {
                        if (Acc.RateId == 0)
                        {

                            AccLDetails.Add(new Item_Rate
                            {

                                SizeId = Acc.SizeId,
                                Itemid = Acc.ItemId,
                                ColorId = Acc.ColorId,
                                SupplierId = Acc.SupplierId,
                                Rate = Acc.Rate,
                                Buyerid = Acc.BuyerId,
                                RateId = Acc.RateId

                            });
                        }
                    }
                }

                var result3 = ItemRateRepo.AddData(AccLDetails);

                return new Response<bool>(result, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteItem(int id)
        {
            return new Response<bool>(ItemRateRepo.DeleteData(id), Status.SUCCESS, "Deleted Successfully");
        }
        public Response<bool> DeleteInv(int id)
        {
            return new Response<bool>(ItemRateRepo.DeleteDataInv(id), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
