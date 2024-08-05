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
    public class DespatchBuyerOrderBusiness : IDespatchBuyerOrderBusiness
    {
        IDespatchBuyerOrderRepository DespatchModel = new DespatchBuyerOrderRepository();

        public Response<IList<DespatchAddGridDetail>> GetDespatchAddGridDet(int CompanyId, string OrderType, string RefNo, int storeid, string OrderNo, int Buyerid)
        {
            try
            {
                var DespatchGridDt = DespatchModel.GetDespatchAddGridDet(CompanyId, OrderType, RefNo, storeid, OrderNo, Buyerid).ToList();

                return new Response<IList<DespatchAddGridDetail>>(DespatchGridDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<DespatchAddGridDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<DespatchInnerDetail>> GetDespatchInnerHeaderInfo(int ShipRowId)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetDespatchInnerHeaderInfo(ShipRowId).ToList();

                return new Response<IList<DespatchInnerDetail>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<DespatchInnerDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<DespatchInnerDetail>> GetDespatchInnerItemInfo(int ShipRowId, string OrderNo, string ShipNo)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetDespatchInnerItemDetail(ShipRowId, OrderNo, ShipNo).ToList();

                return new Response<IList<DespatchInnerDetail>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<DespatchInnerDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IList<DespatchInnerDetail>> GetDespatchInnerItemStockInfo(string OrderNo, string JobOrderNo, int itemId, int ColorId, int SizeId, int StoreUnitId)
        {
            try
            {
                var DespatchHeaderDt = DespatchModel.GetDespatchInnerItemStockDetail(OrderNo, JobOrderNo, itemId, ColorId, SizeId, StoreUnitId).ToList();

                return new Response<IList<DespatchInnerDetail>>(DespatchHeaderDt, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IList<DespatchInnerDetail>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Common.Response<bool> CreateDespatch(Domain.DespatchMas DespatAdd)
        {



            int? DSupID = 0;

       
            //Insert into DespatchMas
            var DespatMas = DespatchModel.AddDespatch(new Domain.DespatchMas
            {
                DespatchNo = DespatAdd.DespatchNo,
                DespatchDate = DespatAdd.DespatchDate,
                CompanyId = DespatAdd.CompanyId,
                OrderNo = DespatAdd.OrderNo,
                StyleId = DespatAdd.StyleId,
                BuyOrdShip = DespatAdd.BuyOrdShip,
                ShipMode = DespatAdd.ShipMode,
                SystemId = DespatAdd.SystemId,
                ShipType = DespatAdd.ShipType,
                DocRefNo = DespatAdd.DocRefNo,
                DocRefDate = DespatAdd.DocRefDate,
                InvRefNo = DespatAdd.InvRefNo,
                InvRefDate = DespatAdd.InvRefDate,
                IssStoreId = DespatAdd.IssStoreId,
                OrderType = DespatAdd.OrderType,
                PreCarrBy = DespatAdd.PreCarrBy,
                PlaceofRecpt = DespatAdd.PlaceofRecpt,
                VesselFlightNo = DespatAdd.VesselFlightNo,
                MarksNo = DespatAdd.MarksNo,
                PortofDischargeId = DespatAdd.PortofDischargeId,
                Cartons = DespatAdd.Cartons,
                CreatedBy = DespatAdd.CreatedBy,
                CBMQty = DespatAdd.CBMQty,
                SupplierId = DespatAdd.SupplierId,

                DespatchDet = DespatAdd.DespatchDet,
                DespatchStock = DespatAdd.DespatchStock,
            });

            if (DespatMas)
            {
                return new Response<bool>(DespatMas, Status.SUCCESS, "Saved Successfully");
            }
            else
            {
                return new Response<bool>(DespatMas, Status.ERROR, "");
            }
        }

        public Common.Response<bool> UpdateDespatch(Domain.DespatchMas DespatUpd)
        {
            //Update into DespatchMas
            var DespUpd = DespatchModel.UpdateDespatch(DespatUpd);

            if (DespUpd)
            {
                return new Response<bool>(DespUpd, Status.SUCCESS, "Updated Successfully");
            }
            else
            {
                return new Response<bool>(DespUpd, Status.ERROR, "");
            }
        }

        public Response<IList<Domain.DespatchMainGridProperty>> GetMaindt(int CompanyId, string Fromdate, string Todate, string OrderType, string RefNo, string OrderNo, int Buyerid, string ShipType)
        {
            try
            {
                var getmaindt = DespatchModel.GetMainData(CompanyId, Fromdate, Todate, OrderType, RefNo, OrderNo, Buyerid, ShipType);

                return new Response<IList<Domain.DespatchMainGridProperty>>(getmaindt, Status.SUCCESS, "Fetched Successfully");
                //return res;
            }
            catch (Exception)
            {
                return new Response<IList<Domain.DespatchMainGridProperty>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.DespatchMas>> GetDespatchHeaderInformation(int DespatchId)
        {
            try
            {
                var CuttingHeaderDetails = DespatchModel.GetDespatchHeaderInfo(DespatchId);

                return new Response<IQueryable<Domain.DespatchMas>>(CuttingHeaderDetails, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.DespatchMas>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> DeleteDespatch(int DepatchID)
        {
            return new Response<bool>(DespatchModel.DeleteDespatch(DepatchID), Status.SUCCESS, "Deleted Successfully");
        }
    }
}
