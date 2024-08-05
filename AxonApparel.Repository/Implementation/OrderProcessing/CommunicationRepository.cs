using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class CommunicationRepository:ICommunicationRepository
    {
        AxonApparelEntities entities = new AxonApparelEntities();

        public IQueryable<Communication> GetDataList()
        {
            return entities.Communications.OrderBy(c => c.Id);
        }

        public Communication GetDataById(int id)
        {
            return entities.Communications.Where(c => c.Id == id).FirstOrDefault();
        }

        public int AddData(Communication objAdd)
        {
            var id = entities.Communications.Add(objAdd);
            entities.SaveChanges();
            return id.Id;
        }

        public bool UpdateData(Communication Commobj)
        {
            var result = false;
            var commUpd = entities.Communications.Where(c => c.Id == Commobj.Id).FirstOrDefault();
            if (commUpd != null)
            {
                commUpd.Id = Commobj.Id;
                commUpd.Companyid = Commobj.Companyid;
                commUpd.Buyerid =(int) (Commobj.Buyerid == 0 ? 0 : Commobj.Buyerid);
                //commUpd.Supplierid = (int)(Commobj.Supplierid == 0 ? Convert.ToInt32(DBNull.Value) : Commobj.Supplierid);
                commUpd.Supplierid = (int)(Commobj.Supplierid == 0 ? 0 : Commobj.Supplierid);
                commUpd.Agentid = (int)(Commobj.Agentid == 0 ? 0 : Commobj.Agentid);
                commUpd.Others = (Commobj.Others==string.Empty?DBNull.Value.ToString():Commobj.Others);
                commUpd.EntryNo = (Commobj.EntryNo == string.Empty ? DBNull.Value.ToString() : Commobj.EntryNo);
                commUpd.EntryDate =(DateTime) Commobj.EntryDate;
                commUpd.RefNo = (Commobj.RefNo == string.Empty ? DBNull.Value.ToString() : Commobj.RefNo); 
                commUpd.RefDate =(DateTime) Commobj.RefDate;
                commUpd.EnquiryNo = (Commobj.EnquiryNo == string.Empty ? DBNull.Value.ToString() : Commobj.EnquiryNo);
                commUpd.OrderNo = (Commobj.OrderNo == string.Empty ? DBNull.Value.ToString() : Commobj.OrderNo);
                commUpd.OrderRefNo = (Commobj.OrderRefNo == string.Empty ? DBNull.Value.ToString() : Commobj.OrderRefNo);
                commUpd.MiscRefNo = (Commobj.MiscRefNo == string.Empty ? DBNull.Value.ToString() : Commobj.MiscRefNo);
                commUpd.CompanyType = (Commobj.CompanyType == string.Empty ? DBNull.Value.ToString() : Commobj.CompanyType); 
                commUpd.From =(DateTime) Commobj.From;
                commUpd.To =(DateTime) Commobj.To;
                commUpd.CompanyModeid =(int) Commobj.CompanyModeid;
                commUpd.Subject = (Commobj.Subject == string.Empty ? DBNull.Value.ToString() : Commobj.Subject);
                commUpd.Description = (Commobj.Description == string.Empty ? DBNull.Value.ToString() : Commobj.Description);
                commUpd.Inward = (Commobj.Inward == string.Empty ? DBNull.Value.ToString() : Commobj.Inward);
                commUpd.Remarks = (Commobj.Remarks == string.Empty ? DBNull.Value.ToString() : Commobj.Remarks);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }

        public bool DeleteData(int id)
        {
            var result = false;
            var Det = entities.CommunicationDocs.Where(u => u.EntryId == id);
            foreach (var u in Det)
            {
                entities.CommunicationDocs.Remove(u);
            }
            var addl = entities.Communications.Where(c => c.Id== id).FirstOrDefault();
            if (addl != null)
            {
                entities.Communications.Remove(addl);
            }
            entities.SaveChanges();
            result = true;
            return result;
        }
    }
}
