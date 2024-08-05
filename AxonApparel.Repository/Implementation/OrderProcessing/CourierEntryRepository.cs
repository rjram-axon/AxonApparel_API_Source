using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using AxonApparel.Domain;


namespace AxonApparel.Repository
{
    public class CourierEntryRepository : ICourierEntryRepository
    {
        OrderEntities entities = new OrderEntities();

        public int AddData(Courier_Mas objCmas)
        {
            var id = entities.Courier_Mas.Add(objCmas);
            entities.SaveChanges();
            return id.Courier_MasId;
        }


        public bool DeleteData(int Id)
        {
            var result = false;
            var Det = entities.Courier_Det.Where(u => u.Courier_MasId == Id);

            foreach (var u in Det)
            {
                entities.Courier_Det.Remove(u);
            }

            var Mas = entities.Courier_Mas.Where(c => c.Courier_MasId == Id).FirstOrDefault();
            if (Mas != null)
            {
                entities.Courier_Mas.Remove(Mas);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool UpdateData(Courier_Mas objAd)
        {

            var result = false;

            var App = entities.Courier_Mas.Where(c => c.Courier_MasId == objAd.Courier_MasId).FirstOrDefault();
            if (App != null)
            {

                App.Courier_MasId = objAd.Courier_MasId;
                App.CompanyId = objAd.CompanyId;
                App.EntryNo = objAd.EntryNo;
                App.EntryDate = objAd.EntryDate;
                App.Ref_No = objAd.Ref_No;
                App.CourierId = objAd.CourierId;
                App.DespType = objAd.DespType;
                App.DespLocationId = objAd.DespLocationId;
                App.AWBNo = objAd.AWBNo;
                App.AWBDate = objAd.AWBDate;
                App.ContactPerson = objAd.ContactPerson;
                App.InOrOut = objAd.InOrOut;
                App.ReturnStatus = objAd.ReturnStatus;
                App.ReturnableDate = objAd.ReturnableDate;
                App.Remarks = objAd.Remarks;
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
        public bool UpdateDetData(List<Courier_Det> objCDet)
        {

            var result = false;

            foreach (var i in objCDet)
            {
                var c = entities.Courier_Det.Where(a => a.Courier_DetId.Equals(i.Courier_DetId)).FirstOrDefault();
                if (c != null)
                {
                    c.Courier_DetId = i.Courier_DetId;
                    c.ItemId = i.ItemId;
                    c.ColorId = i.ColorId;
                    c.SizeId = i.SizeId;
                    c.Quantity = i.Quantity;
                }
            }

            entities.SaveChanges();
            result = true;
            return result;
        }

        public Courier_Mas GetDataById(int Courier_MasId)
        {
            return entities.Courier_Mas.Where(c => c.Courier_MasId == Courier_MasId).FirstOrDefault();
        }

        public IQueryable<CourierEntryList> GetDataList(int? companyId, string EntryNo, string fromDate, string toDate, int? DespLocationId, string DespType)
        {
            //IQueryable<CourierEntryList> query = from o in entities.Courier_Mas
            //                                     join c in entities.CompanyUnits on o.DespLocationId equals c.Id
            //                                     join d in entities.Couriers on o.CourierId equals d.CourierId
            //                                     select new CourierEntryList
            //                                     {
            //                                         Courier_MasId = o.Courier_MasId,
            //                                         EntryNo = o.EntryNo,
            //                                         EntryDate = (DateTime)o.EntryDate,
            //                                         Courier = d.Courier1,
            //                                         DespLocation = c.CompanyUnit1,
            //                                     };
            //return query;
            IQueryable<CourierEntryList> query = (from cd1 in entities.Proc_Apparel_GetCourierMainDetails(companyId == null ? 0 : companyId, string.IsNullOrEmpty(EntryNo) ? "" : EntryNo, fromDate == null ? "" : fromDate.ToString(), toDate == null ? "" : toDate.ToString(), DespLocationId == null ? 0 : DespLocationId,string.IsNullOrEmpty(DespType)?"": DespType)
                                                  select new CourierEntryList
                                           {

                                               Courier_MasId = cd1.Courier_MasId,
                                               EntryNo = cd1.EntryNo,
                                               EntryDate = (DateTime)cd1.EntryDate,
                                               Courier = cd1.Courier,
                                               DespLocation = cd1.DespLocation,


                                           }).AsQueryable();
            return query;
        }

        public IQueryable<CourierEntryList> GetDataDetList(int Courier_MasId)
        {
            IQueryable<CourierEntryList> query = from cd in entities.Courier_Det
                                                 join i in entities.Item on cd.ItemId equals i.ItemId
                                                 join c in entities.Color on cd.ColorId equals c.Colorid
                                                 join s in entities.Size on cd.SizeId equals s.SizeId
                                                 join u in entities.Unit_of_measurement on cd.UomId equals u.UomId
                                                 where cd.Courier_MasId == Courier_MasId
                                                 select new CourierEntryList
                                                 {

                                                     Courier_DetId = cd.Courier_DetId,
                                                     ItemId = (int)cd.ItemId,
                                                     Item = i.Item1,
                                                     ColorId = (int)cd.ColorId,
                                                     Color = c.Color1,
                                                     SizeId = (int)cd.SizeId,
                                                     Size = s.size1,
                                                     UomId = (int)cd.UomId,
                                                     Uom = u.Uom,
                                                     Quantity = (int)cd.Quantity,

                                                 };
            return query;
        }


        public bool AddDetData(List<Courier_Det> objCDet)
        {
            foreach (var item in objCDet)
            {
                entities.Courier_Det.Add(item);
            }
            entities.SaveChanges();
            return true;

        }


        public IQueryable<Courier_Mas> GetEntryNoDataList()
        {
            return entities.Courier_Mas.OrderBy(c => c.EntryNo);
        }

                
    }
}
