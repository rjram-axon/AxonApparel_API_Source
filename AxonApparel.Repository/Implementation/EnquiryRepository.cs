using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class EnquiryRepository : IEnquiryRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<MarkEnqMa> GetDataList()
        {
            return entities.MarkEnqMas.OrderBy(e => e.EnquiryId);
        }

        public MarkEnqMa GetDataById(int id)
        {
            return entities.MarkEnqMas.Where(c => c.EnquiryId == id).FirstOrDefault();
        }

        public int AddData(MarkEnqMa objMarEnq)
        {
            var result = entities.MarkEnqMas.Add(objMarEnq);
            entities.SaveChanges();
            return result.EnquiryId;
        }

        public bool UpdateData(MarkEnqMa objMarEnq)
        {
            var result = false;
            var Enq = entities.MarkEnqMas.Where(c => c.EnquiryId == objMarEnq.EnquiryId).FirstOrDefault();
            if (Enq != null)
            {
                Enq.EnqDate = objMarEnq.EnqDate;
                Enq.CompanyId = objMarEnq.CompanyId;
                Enq.BuyerId = objMarEnq.BuyerId;
                Enq.BuyerRef = objMarEnq.BuyerRef;
                Enq.RefDate = objMarEnq.RefDate;
                Enq.TermsId = objMarEnq.TermsId;
                Enq.DespDate = objMarEnq.DespDate;
                Enq.Remarks = objMarEnq.Remarks;
                Enq.Despatched_closed = objMarEnq.Despatched_closed;
                Enq.Sampling = objMarEnq.Sampling;
                Enq.Ordered = objMarEnq.Ordered;
                Enq.Status = objMarEnq.Status;
                Enq.ShipSystemId = objMarEnq.ShipSystemId;
                Enq.SeasonId = objMarEnq.SeasonId;
                Enq.CreatedBy = objMarEnq.CreatedBy;
            }
            entities.SaveChanges();

            result = true;
            return result;
        }

        public bool DeleteData(int id)
        {
            var result = false;
            var Enq = entities.MarkEnqMas.Where(c => c.EnquiryId == id).FirstOrDefault();
            if (Enq != null)
            {
                entities.MarkEnqMas.Remove(Enq);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
    }
}
