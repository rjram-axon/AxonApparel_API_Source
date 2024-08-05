CREATE TABLE [dbo].[OrdCons_ProcSeq]
(
	ordconsprocessmasid int identity,
ordconsmasid int,
ordconsprocessid int,
ordconsprocessloss numeric(15,3),
 PRIMARY KEY (ordconsprocessmasid),
    CONSTRAINT FK_ordconsmasid FOREIGN KEY (ordconsmasid)
    REFERENCES OrdCons_Mas(ordconsmasid)

)
