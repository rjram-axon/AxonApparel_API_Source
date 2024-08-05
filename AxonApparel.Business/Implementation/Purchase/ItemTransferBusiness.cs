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
    public class ItemTransferBusiness : IItemTransferBusiness
    {
        IItemTransferRepository repo = new ItemTransferRepository();

        public Response<IList<Domain.ItemTransDet>> LoadItemtransList(int? compid, int? storeid, int? processid, int? itemid, int? colorid, int? sizeid, string ordtype, string Ordno, string jobno,
             string Transno, string Transtype, string Itemtype)
        {
            try
            {

                var ProductWO = repo.LoadItemtransList(compid, storeid, processid, itemid, colorid, sizeid, ordtype, Ordno, jobno,
             Transno, Transtype, Itemtype);

                return new Response<IList<Domain.ItemTransDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ItemTransDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.ItemTransDet>> LoadItemtransMainList(int? masid, int? compid, int? fromitemid, int? Toitemid, string ordtype, string frmdate, string todate, string orderno, string refno)
        {
            try
            {

                var ProductWO = repo.LoadItemtransMainList(masid, compid, fromitemid, Toitemid, ordtype, frmdate, todate, orderno, refno);

                return new Response<IList<Domain.ItemTransDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ItemTransDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }


        public Response<IList<Domain.ItemTransDet>> LoadItemtransEditList(int? masid)
        {
            try
            {

                var ProductWO = repo.LoadItemtransEditList(masid);

                return new Response<IList<Domain.ItemTransDet>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ItemTransDet>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<Domain.ItemTransMas>> LoadItemtransStatementList()
        {
            try
            {

                var ProductWO = repo.LoadItemtransStatementList();

                return new Response<IList<Domain.ItemTransMas>>(ProductWO, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.ItemTransMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<int> AddItemtranfer(Domain.ItemTransMas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.ItemTransMas itemtransmasInsert = new AxonApparel.Repository.ItemTransMas
                {
                    TransMasId = ProdMasAdd.TransMasId,
                    EntryNo = ProdMasAdd.EntryNo,
                    EntryDate = ProdMasAdd.EntryDate,
                    CompanyId = ProdMasAdd.CompanyId,
                    OrderType = ProdMasAdd.OrderType,
                    Remarks = ProdMasAdd.Remarks,
                    CreatedBy = ProdMasAdd.CreatedBy,

                };
                var TransDet = new List<Repository.ItemTransDet>();

                if (ProdMasAdd.ItmTrsDet != null)
                {
                    if (ProdMasAdd.ItmTrsDet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ItmTrsDet)
                        {
                            TransDet.Add(new Repository.ItemTransDet
                            {
                                TransDetId = 0,
                                TransMasId = 0,
                                StockId = item.StockId,
                                NewStockId = item.NewStockId,
                                FromItemId = item.FromItemId,
                                ToItemId = item.ToItemId,
                                ColorId = item.ColorId,
                                ToColorId = item.ToColorId,
                                SizeId = item.SizeId,
                                ToSizeId = item.ToSizeId,
                                TransQty = item.TransQty,
                                SecTransQty = item.SecTransQty,
                            });
                        }
                    }
                }



                var result = repo.AddDetData(itemtransmasInsert, TransDet, "Add");
                return new Response<int>(1, Status.SUCCESS, "Saved Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<int> UpdateItemtranfer(Domain.ItemTransMas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.ItemTransMas itemtransmasInsert = new AxonApparel.Repository.ItemTransMas
                {
                    TransMasId = ProdMasAdd.TransMasId,
                    EntryNo = ProdMasAdd.EntryNo,
                    EntryDate = ProdMasAdd.EntryDate,
                    CompanyId = ProdMasAdd.CompanyId,
                    OrderType = ProdMasAdd.OrderType,
                    Remarks = ProdMasAdd.Remarks,
                    CreatedBy = ProdMasAdd.CreatedBy,

                };
                var TransDet = new List<Repository.ItemTransDet>();

                if (ProdMasAdd.ItmTrsDet != null)
                {
                    if (ProdMasAdd.ItmTrsDet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ItmTrsDet)
                        {
                            TransDet.Add(new Repository.ItemTransDet
                            {
                                TransDetId = 0,
                                TransMasId = 0,
                                StockId = item.StockId,
                                NewStockId = item.NewStockId,
                                FromItemId = item.FromItemId,
                                ToItemId = item.ToItemId,
                                ColorId = item.ColorId,
                                ToColorId = item.ToColorId,
                                SizeId = item.SizeId,
                                ToSizeId = item.ToSizeId,
                                TransQty = item.TransQty,
                                SecTransQty = item.SecTransQty,
                            });
                        }
                    }
                }



                var result = repo.UpdateDetData(itemtransmasInsert, TransDet, "Update");
                return new Response<int>(1, Status.SUCCESS, "Updated Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<int> DeleteItemtranfer(Domain.ItemTransMas ProdMasAdd)
        {

            decimal CsecQty = 0;
            try
            {
                AxonApparel.Repository.ItemTransMas itemtransmasInsert = new AxonApparel.Repository.ItemTransMas
                {
                    TransMasId = ProdMasAdd.TransMasId,
                    EntryNo = ProdMasAdd.EntryNo,
                    EntryDate = ProdMasAdd.EntryDate,
                    CompanyId = ProdMasAdd.CompanyId,
                    OrderType = ProdMasAdd.OrderType,
                    Remarks = ProdMasAdd.Remarks,
                    CreatedBy = ProdMasAdd.CreatedBy,

                };
                var TransDet = new List<Repository.ItemTransDet>();

                if (ProdMasAdd.ItmTrsDet != null)
                {
                    if (ProdMasAdd.ItmTrsDet.Count > 0)
                    {
                        foreach (var item in ProdMasAdd.ItmTrsDet)
                        {
                            TransDet.Add(new Repository.ItemTransDet
                            {
                                TransDetId = 0,
                                TransMasId = 0,
                                StockId = item.StockId,
                                NewStockId = item.NewStockId,
                                FromItemId = item.FromItemId,
                                ToItemId = item.ToItemId,
                                ColorId = item.ColorId,
                                ToColorId = item.ToColorId,
                                SizeId = item.SizeId,
                                ToSizeId = item.ToSizeId,
                                TransQty = item.TransQty,
                                SecTransQty = item.SecTransQty,
                            });
                        }
                    }
                }



                var result = repo.DeleteDetData(itemtransmasInsert, TransDet, "Delete");
                return new Response<int>(1, Status.SUCCESS, "Deleted Successfully");

            }
            catch (Exception ex)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

    }
}
