using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public class CommDocRepository:ICommDocRepository
    {
       AxonApparelEntities entities = new AxonApparelEntities();


       public IQueryable<CommunicationDoc> GetDataList()
       {
           throw new NotImplementedException();
       }

       public CommunicationDoc GetDataById(int id)
       {
           return entities.CommunicationDocs.Where(c => c.EntryId == id).FirstOrDefault();
       }

       public int AddData(CommunicationDoc obj)
       {
           var result = entities.CommunicationDocs.Add(obj);
           entities.SaveChanges();
           return result.EntryId;
       }

       public bool UpdateData(CommunicationDoc obj)
       {
           var result = false;
           var commUpd = entities.CommunicationDocs.Where(c => c.EntryId == obj.EntryId).FirstOrDefault();
           if (commUpd != null)
           {
               commUpd.EntryId = obj.EntryId;
               commUpd.DocTitle = obj.DocTitle;
               commUpd.DocName = obj.DocName;
           }
           entities.SaveChanges();
           result = true;
           return result;
       }

       public bool DeleteData(int id)
       {
           throw new NotImplementedException();
       }
    }
}
