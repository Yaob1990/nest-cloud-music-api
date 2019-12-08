import { Injectable, Inject, HttpService, BadRequestException } from '@nestjs/common';
import {
    TopSongDto, BannerDto, SongDetailsDto, AlbumDto,
    AlbumDetailDynamicDto, AlbumSubDto, AlbumSubListDto,
    ArtistsDto, ArtistsMvDto, ArtistsAlbumDto, ArtistsDescDto,
    SimiMvDto, SimiUserDto, LikeDto, LikeListDto, FmTrashDto,
    TopAlbumDto, ScrobbleDto, TopArtistsDto, MvAllDto,
    MvFirstDto, MvExclusiveRcmd, PersonalizedDto, DailySigninDto, TopMvDto, TopDetailDto, MvUrlDto, VideoGroupDto, RelatedAllvideoDto
} from '../dto/cloudmusic.dto';

@Injectable()
export class CloudMusicService {
    // 网易云提供的 Api 接口http://musicapi.leanapp.cn/
    private readonly cloudMusicApi = 'https://music.aityp.com/';

    // private readonly cloudMusicApi = 'http://localhost:3000/';

    constructor(@Inject(HttpService) private readonly httpService: HttpService) {
        this.cloudMusicApi = this.cloudMusicApi;
    }
    async topSong(topSongDto: TopSongDto) {
        if (!topSongDto.type) {
            throw new BadRequestException(`type  must be passed`);
        }
        const bashApi = this.cloudMusicApi + `top/song?type=${topSongDto.type}`;
        const data = await this.httpService.get(bashApi).toPromise();
        return await data.data;
    }
    async banner(bannerDto: BannerDto) {
        // 默认为0，即PC
        const data = {
            type: bannerDto.type || 0
        };
        const bashApi = this.cloudMusicApi + `banner?type=${data.type}`;
        const res = await this.httpService.post(bashApi, data).toPromise();
        return await res.data;
    }

    async songDetails(songDetails: SongDetailsDto) {
        if (!songDetails.ids) {
            throw new BadRequestException(`ids  must be passed`);
        }
        const bashApi = this.cloudMusicApi + `song/detail?ids=${songDetails.ids}`;
        const res = await this.httpService.post(bashApi, songDetails).toPromise();
        return await res.data;
    }
    async  personalFm() {
        const bashApi = this.cloudMusicApi + `personal_fm`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async dailySignin(dailySigninDto: DailySigninDto) {
        const data = {
            type: dailySigninDto.type || 0
        };
        const bashApi = this.cloudMusicApi + `daily_signin`;
        const res = await this.httpService.post(bashApi, data).toPromise();
        return await res.data;
    }

    

    async fmTrash(fmTrashDto: FmTrashDto) {
        if (!fmTrashDto.id) {
            throw new BadRequestException('uid must be passed');
        }
        const bashApi = this.cloudMusicApi + `fm_trash?id=${fmTrashDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async topAlbum(topAlbumDto: TopAlbumDto) {
        const data = {
            offset: topAlbumDto.offset || 0,
            limit: topAlbumDto.limit || 50
        };
        const bashApi = this.cloudMusicApi + `top/album?offset=${data.offset}&limit=${data.limit}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async scrobble(scrobbleDto: ScrobbleDto) {
        if (!scrobbleDto.id) {
            throw new BadRequestException('id must be passed ');
        }
        if (!scrobbleDto.sourceid) {
            throw new BadRequestException('sourceid be passed');
        }
        const bashApi = this.cloudMusicApi + `scrobble/id=${scrobbleDto.id}&sourceid=${scrobbleDto.sourceid}&time=${scrobbleDto.time}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async topArtists(topArtistsDto: TopArtistsDto) {
        const data = {
            offset: topArtistsDto.offset || 0,
            limit: topArtistsDto.limit || 50
        };
        const bashApi = this.cloudMusicApi + `top/artists?offset=${data.offset}&limit=${data.limit}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }
    


    async programRecommend() {
        const bashApi = this.cloudMusicApi + `program/recommend`;
        const res = await this.httpService.get(bashApi).toPromise();
        return res.data;
    }

    async personalizedPrivatecontent() {
        const bashApi = this.cloudMusicApi + `personalized/privatecontent`;
        const res = await this.httpService.get(bashApi).toPromise();
        return res.data;
    }

    async topMv(topMvDto: TopMvDto) {
        const data = {
            area: topMvDto.area || '',
            limit: topMvDto.limit || 30,
            offset: topMvDto.offset || 0,
        };
        const bashApi = encodeURI(this.cloudMusicApi + `top/mv?limit=${data.limit}&area=${data.area}&offset=${data.offset}`);
        const res = await this.httpService.post(bashApi).toPromise();
        return await res.data;
    }

    async topDetail(topDetailDto: TopDetailDto) {
        if (!topDetailDto.mvid) {
            throw new BadRequestException('mvid must be passed ')
        }
        const bashApi = this.cloudMusicApi + `mv/detail?mvid=${topDetailDto.mvid}`;
        const res = await this.httpService.post(bashApi).toPromise();
        return await res.data;
    }

    async mvUrl(mvUrlDto: MvUrlDto) {
        if (!mvUrlDto.id) {
            throw new BadRequestException(`id must be passed `);
        }
        const bashApi = this.cloudMusicApi + `mv/url?id=${mvUrlDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async videoGroupList() {
        const bashApi = this.cloudMusicApi + `video/group/list`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async videoGroup(videoGroupDto: VideoGroupDto) {
        if (!videoGroupDto.id) {
            throw new BadRequestException(`id must be passed`);
        }
        const bashApi = this.cloudMusicApi + `video/group?id=${videoGroupDto.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }

    async relatedAllvideo(relatedAllvideo: RelatedAllvideoDto) {
        if (!relatedAllvideo.id) {
            throw new BadRequestException(`idmust be passed `);
        }
        const bashApi = this.cloudMusicApi + `related/allvideo?id=${relatedAllvideo.id}`;
        const res = await this.httpService.get(bashApi).toPromise();
        return await res.data;
    }
}
