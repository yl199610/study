create sequence seq_profile start with 10000;


create table profile(
     id number primary key,
     name varchar2(20 char) not null, 
     birthday varchar2(20 char)not null, 
     gender varchar2(4 char), 
     career varchar2(20 char), 
     address varchar2(50 char), 
     mobile varchar2(20 char)
);

insert into PROFILE
select seq_profile.nextval, 
dbms_random.string('l',dbms_random.value(5, 20)),
to_char(add_months(sysdate, dbms_random.value(12*18, 12*50) * -1), 'yyyy-MM-dd'),
decode(ceil(dbms_random.value(0, 2)), 1, '男', '女'),
decode(ceil(dbms_random.value(0, 6)), 1, '程序员', 2, '测试员', 3, '分析员', 4, '设计员', 5, '翻译员', '管理员'),
decode(ceil(dbms_random.value(0, 6)), 1, '湖南', 2, '湖北', 3, '广东', 4, '广西', 5, '北京', '上海'),
'180'||ceil(dbms_random.value(10000000,99999999)) from dual connect by level <= 1000;
alter table profile add picPath varchar2(200);

select * from PROFILE where id=10237 and name='mtyfajf';

--分页的实现
select count(1) total from profile
select ceil(count(1)/10) totalPage from profile--获得总页数向上取整
--合并
select count(1) total,ceil(count(1)/10) totalPage from profile

select * from
(select m.*,rownum rn from
(select * from profile order by 1 desc) m where rownum <= 1*10) where rn>(1-1)*10