CREATE TABLE [dbo].[OrdCons_YarnFab]
(
	ordconsyarnfabmasid int identity,
ordconsmasid int,
ordconsitemtype varchar(10),
ordconsitemid int,
 PRIMARY KEY (ordconsyarnfabmasid),
    CONSTRAINT FK_ordconsitemid FOREIGN KEY (ordconsitemid)
    REFERENCES Item(ItemId)
)
